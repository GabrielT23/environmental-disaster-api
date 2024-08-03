import { configuration } from '@config/configuration';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { AuthService } from '../services/auth.service';
import { Reflector } from '@nestjs/core';
import { RoleUSer } from '../role.decorator';
  
  const config = configuration();

  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        private authService: AuthService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {

        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: config.jwtSecret
          }
        );
        const { id, email, role } = this.authService.decodeToken(token);

        request.user = {
            id: id.toString(),
            email: email.toString(),
            role,
        };
        const roleNameFromAuth = this.reflector.get(RoleUSer, context.getHandler());
        await this.authService.checkRole({
            email,
            roleName: roleNameFromAuth,
        });
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }