export class Property {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly price: number,
    public readonly property_type: string,
    public readonly address: string,
    public readonly city: string,
    public readonly state: string,
    public readonly zip_code: string | null,
    public readonly bedrooms: number | null,
    public readonly bathrooms: number | null,
    public readonly area: number | null,
    public readonly garage_spots: number | null,
    public readonly status: string,
    public readonly corretor_id: string,
    public readonly created_at: Date,
    public readonly updated_at: Date,
    public readonly deleted_at: Date | null,
  ) {}
}