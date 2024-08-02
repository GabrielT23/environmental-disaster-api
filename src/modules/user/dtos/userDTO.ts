// src/dto/user.dto.ts

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  