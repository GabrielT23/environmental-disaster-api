
import { CreateUserDto, User } from "../dtos/userDTO";

export abstract class IUsersRepository {
  abstract create(user: CreateUserDto): Promise<User>;
  abstract update(id: string, user: Partial<User>): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(userEmail: string): Promise<User | null>;
  abstract deleteById(id: string): Promise<void>;
}