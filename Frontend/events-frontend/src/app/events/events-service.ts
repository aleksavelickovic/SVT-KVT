import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../env/enviroment';
import {FrontendEvent} from './model/frontendEvent';
import {EventLocation} from '../locations/model/eventLocation';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  events: FrontendEvent[] = []

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<FrontendEvent[]> {
    return this.httpClient.get<FrontendEvent[]>(environment.apiHost + '/events')
  }

  deleteEvent(id: number): Observable<any> {
    return this.httpClient.delete(environment.apiHost + '/events/' + id)
  }

  findEvent(id: number): Observable<FrontendEvent> {
    return this.httpClient.get<FrontendEvent>(environment.apiHost + '/events/' + id)
  }

  editEvent(event: FrontendEvent): Observable<FrontendEvent> {
    console.log("ID OD DOGAJAJA: " + event.id)
    return this.httpClient.patch<FrontendEvent>(environment.apiHost + '/events/' + event.id, event)
  }


}
