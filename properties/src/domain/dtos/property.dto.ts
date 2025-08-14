export interface CreatePropertyDto {
  title: string;
  description: string;
  price: number;
  property_type: 'APARTMENT' | 'HOUSE' | 'CONDO' | 'LAND' | 'COMMERCIAL' | 'FARM';
  address: string;
  city: string;
  state: string;
  zip_code?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  garage_spots?: number;
  corretor_id: string;
  images?: string[];
}

export interface UpdatePropertyDto {
  title?: string;
  description?: string;
  price?: number;
  property_type?: 'APARTMENT' | 'HOUSE' | 'CONDO' | 'LAND' | 'COMMERCIAL' | 'FARM';
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  garage_spots?: number;
  status?: 'AVAILABLE' | 'SOLD' | 'RENTED' | 'RESERVED';
  images?: string[];
}

export interface PropertySearchDto {
  property_type?: string;
  city?: string;
  state?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  min_area?: number;
  max_area?: number;
  status?: string;
  corretor_id?: string;
  page?: number;
  limit?: number;
}