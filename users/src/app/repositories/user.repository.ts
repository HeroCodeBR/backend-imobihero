import { CreateUserDto } from '@/domain/dtos/user.dto';
import { User } from '@/domain/entities/user.entity';

export abstract class UsersRepository {
  abstract create(createUserDto: CreateUserDto): Promise<User>;
  abstract findAllusers(key: string): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findCorretorById(corretor_id: string): Promise<User | null>;
  abstract update(id: string, createUserDto: CreateUserDto): Promise<User>;
  abstract delete(id: string): Promise<boolean>;
  abstract findUserByEmail(email: string): Promise<User | null>;
}
