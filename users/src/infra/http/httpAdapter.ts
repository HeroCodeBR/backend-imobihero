export interface HttpRequest {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
}
export interface HttpResponse {
  status: number;
  message: string;
  data?: any;
}
