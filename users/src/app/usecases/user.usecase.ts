import { CreateUserDto } from '@/domain/dtos/user.dto';
import { UsersRepository } from '../repositories/user.repository';
import { User } from '@/domain/entities/user.entity';
import { HttpError } from '../errors/httpError';

class UserUseCase {
  constructor(private readonly userRepository: UsersRepository) {}
  public async create(createUserDto: CreateUserDto): Promise<User> {
    const result = await this.userRepository.create(createUserDto);
    return result;
  }
}

export { UserUseCase };
