import { UserUseCase } from '@/app/usecases/user.usecase';

export const makeUserFactory = () => {
  const userUseCase = new UserUseCase();
  return userUseCase;
};
