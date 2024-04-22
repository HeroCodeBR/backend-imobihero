import { CreateUserDto } from '@/domain/dtos/user.dto';
import { User } from '@/domain/entities/user.entity';

export abstract class UsersRepository {
  // abstract findAll(): Promise<any>;
  // abstract findById(id: string): Promise<any>;

  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findAllusers(key: string): Promise<User[]>;
  abstract update(id: string, createUserDto: CreateUserDto): Promise<User>;
  abstract delete(id: string): Promise<boolean>;
}
