export interface FrontendComment {
  id: number;
  text: string | null;
  createdAt: Date;
  repliesTo: FrontendComment | null
}
