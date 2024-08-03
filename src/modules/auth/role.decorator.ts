import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';


export const RoleUSer = Reflector.createDecorator<Role>();
