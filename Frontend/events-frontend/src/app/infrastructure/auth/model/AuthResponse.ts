export interface AuthResponse {
  accessToken: string;
  expiresIn: number
  id: number;
  email: string;
  password: string;
  name: string;
  phone_number: string;
  address: string;
  city: string;
  imageFilename: string;
}
