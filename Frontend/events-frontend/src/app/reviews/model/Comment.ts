export interface FrontendComment {
  id: number;
  text: string | null;
  createdAt: Date;
  belongsTo: string | null;
  repliesTo: FrontendComment | null;
}
