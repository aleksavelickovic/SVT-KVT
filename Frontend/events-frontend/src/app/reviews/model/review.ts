import {Timestamp} from 'rxjs';
import {FrontendEvent} from '../../events/model/frontendEvent';
import {FrontendRate} from './Rate';

export interface FrontendReview {
  id: number;
  createdAt: Date;
  eventCount: number;
  hidden: Boolean;
  event?: number;
  rate: FrontendRate;

}
