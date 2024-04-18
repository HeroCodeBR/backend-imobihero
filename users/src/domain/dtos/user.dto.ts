export class CreateUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly permission_id: string,
  ) {}
}
