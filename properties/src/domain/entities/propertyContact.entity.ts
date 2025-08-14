export class PropertyContact {
  constructor(
    public readonly id: string,
    public readonly property_id: string,
    public readonly client_name: string,
    public readonly client_email: string,
    public readonly client_phone: string | null,
    public readonly message: string,
    public readonly status: string,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}