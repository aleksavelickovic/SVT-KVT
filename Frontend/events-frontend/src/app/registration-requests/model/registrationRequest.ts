export interface RegistrationRequest {
  id?: number;
  email: string;
  status: string;
  address: string;
  createdAt: Date;
  rejectionReason: string
}
