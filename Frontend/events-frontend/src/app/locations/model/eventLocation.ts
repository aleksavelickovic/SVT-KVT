export interface EventLocation {
  id: number | null;
  name: string | null;
  description: string | null;
  createdAt: Array<number> | null;
  address: string | null;
  type: string | null;
  totalRating: number | null;
  imageFilename: string | null | undefined;
}
