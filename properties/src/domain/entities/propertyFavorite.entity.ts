export class PropertyFavorite {
  constructor(
    public readonly id: string,
    public readonly property_id: string,
    public readonly user_id: string,
    public readonly created_at: Date,
  ) {}
}