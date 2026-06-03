export interface EventLocation {
  id: number | null;
  name: string | null;
  description: string | null;
  createdAt: Array<number> | null;
  address: string | null;
  type: string | null;
  totalRating: number | null;
  imageFilename: string | null | undefined;
  documentFilename?: string | null;
  reviewCount?: number | null;
  performanceAverage?: number | null;
  soundAverage?: number | null;
  lightingAverage?: number | null;
  venueAverage?: number | null;
  overallImpressionAverage?: number | null;
  highlight?: string | null;
}
