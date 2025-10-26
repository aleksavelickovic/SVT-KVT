import {FrontendEvent} from '../../events/model/frontendEvent';
import {FrontendRate} from './Rate';
import {FrontendComment} from '../../comments/model/Comment';

export interface FrontendReview {
  id: number;
  createdAt: Date;
  eventCount: number;
  hidden: Boolean;
  event?: FrontendEvent;
  rate: FrontendRate;
  madeBy: string | null
  comment: FrontendComment | null

}
