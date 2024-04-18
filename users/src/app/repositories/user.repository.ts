abstract class UsersRepository {
  abstract getUsers(): Promise<any>;
  abstract createUser(): Promise<void>;
}
