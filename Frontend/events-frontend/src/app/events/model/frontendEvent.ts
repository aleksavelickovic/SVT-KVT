import {EventLocation} from '../../locations/model/eventLocation';

export interface FrontendEvent {
  id: number;
  name: string;
  address: string;
  type: string;
  date: Array<string>;
  price: number;
  recurrent: Boolean;
  location: EventLocation;
}
