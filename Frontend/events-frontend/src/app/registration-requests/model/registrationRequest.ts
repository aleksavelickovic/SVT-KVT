export interface RegistrationRequest {
  id: number;
  email: string;
  password: string;
  name: string;
  phone_number: string;
  birthday: string;
  status: string;
  address: string;
  createdAt: Date;
  rejectionReason: string
}
