import { UserUseCase } from '@/app/usecases/user.usecase';
import { UsersRepositoryPrisma } from '@/infra/repositories/users.repository';

export const makeUserFactory = () => {
  const userRepository = new UsersRepositoryPrisma();
  const userUseCase = new UserUseCase(userRepository);
  return userUseCase;
};
