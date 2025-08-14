export class PropertyView {
  constructor(
    public readonly id: string,
    public readonly property_id: string,
    public readonly user_id: string | null,
    public readonly ip_address: string | null,
    public readonly user_agent: string | null,
    public readonly viewed_at: Date,
  ) {}
}