import { CreateUserDto } from '@/domain/dtos/user.dto';
import { UsersRepository } from '../repositories/user.repository';
import { User } from '@/domain/entities/user.entity';

class UserUseCase {
  constructor(private readonly userRepository: UsersRepository) {}
  public async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    try {
      const result = await this.userRepository.create(createUserDto);
      return result;
    } catch (error) {
      console.log('🚀 ~ UserUseCase ~ create ~ error:', error);
    }
  }
}

export { UserUseCase };
