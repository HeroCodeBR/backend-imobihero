import { CreateUserDto } from '@/domain/dtos/user.dto';
import { User } from '@/domain/entities/user.entity';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { HttpError } from '../errors/httpError';
import { UsersRepository } from '../repositories/user.repository';
class UserUseCase {
  constructor(private readonly userRepository: UsersRepository) {}
  async create(dto: CreateUserDto): Promise<User> {
    const findUserByEmail = await this.userRepository.findUserByEmail(
      dto.email,
    );
    if (findUserByEmail) {
      throw new HttpError(400, 'User already exists');
    }
    const hashPassword = await hash(dto.password, 10);
    const result = await this.userRepository.create({
      ...dto,
      password: hashPassword,
    });
    return result;
  }
  async findAllusers(key: string): Promise<User[]> {
    const result = await this.userRepository.findAllusers(key);
    return result;
  }
  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const result = await this.userRepository.update(id, updateUserDto);
    return result;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result;
  }
  async auth(email: string, password: string) {
    const findUserByEmail = await this.userRepository.findUserByEmail(email);
    if (!findUserByEmail) throw new HttpError(404, 'User not found');

    const passwordMatch = await compare(password, findUserByEmail.password);
    if (!passwordMatch) throw new HttpError(401, 'Invalid password');

    const secretKey = process.env.TOKEN_SECRET;
    if (!secretKey) throw new HttpError(500, 'Token secret not defined');

    const token = sign(
      {
        id: findUserByEmail.id,
        permission: findUserByEmail.permission_id,
      },
      secretKey,
      {
        expiresIn: '15d',
      },
    );
    return token;
  }
}

export { UserUseCase };
