export class CreatePermissionDto {
  constructor(public readonly key: string, public readonly title: string) {}
}

export class UpdatePermissionDto extends CreatePermissionDto {
  constructor(public readonly key: string, public readonly title: string) {
    super(key, title);
  }
}
