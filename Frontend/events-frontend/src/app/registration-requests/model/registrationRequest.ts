export interface RegistrationRequest {
  id?: number;
  email: string;
  password: string;
  address: string;
  rejectionReason: string
}
