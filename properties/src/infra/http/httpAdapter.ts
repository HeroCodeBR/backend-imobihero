export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  ip?: string;
  user?: any;
}

export interface HttpResponse {
  status: number;
  message?: string;
  data?: any;
  error?: string;
}