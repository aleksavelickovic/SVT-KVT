import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../env/enviroment';
import {FrontendEvent} from './model/frontendEvent';

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

}
