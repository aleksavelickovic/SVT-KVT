import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../env/enviroment';
import {EventLocation} from './model/eventLocation';
import {RegistrationRequest} from '../registration-requests/model/registrationRequest';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  locations: EventLocation[] = []

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<EventLocation[]> {
    return this.httpClient.get<EventLocation[]>(environment.apiHost + '/locations')
  }

  add(location: EventLocation): Observable<EventLocation> {
    return this.httpClient.post<EventLocation>(environment.apiHost + '/locations', location)
  }

}
