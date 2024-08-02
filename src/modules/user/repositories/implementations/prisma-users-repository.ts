import { Injectable } from "@nestjs/common";
import { IUsersRepository } from "../IUsers-repository";
import { CreateUserDto, User } from "@modules/user/dtos/userDTO";

@Injectable()
export class UsersRepository implements IUsersRepository {
    create(client: CreateUserDto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(client: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    findById(clientId: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findByEmail(clientEmail: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    deleteById(clientId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}