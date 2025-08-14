export interface CreatePropertyContactDto {
  property_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  message: string;
}

export interface UpdatePropertyContactDto {
  status?: 'PENDING' | 'CONTACTED' | 'SCHEDULED' | 'CLOSED';
}