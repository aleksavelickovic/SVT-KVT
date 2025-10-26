import {FrontendUser} from '../../infrastructure/auth/model/User';

export interface FrontendComment {
  id: number;
  text: string | null;
  createdAt: Date;
  belongsTo: FrontendUser | null;
  repliesTo: FrontendComment | null;
}
