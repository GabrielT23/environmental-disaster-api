
import { CreateUserDto, User } from "../dtos/userDTO";

export abstract class IUsersRepository {
  abstract create(client: CreateUserDto): Promise<void>;
  abstract save(client: User): Promise<void>;
  abstract findById(clientId: string): Promise<User | null>;
  abstract findByEmail(clientEmail: string): Promise<User | null>;
  abstract deleteById(clientId: string): Promise<void>;
}