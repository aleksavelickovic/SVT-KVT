import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../env/enviroment';
import {EventLocation} from './model/eventLocation';

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

  getAllManagedLocations(id: number): Observable<EventLocation[]> {
    return this.httpClient.get<EventLocation[]>(environment.apiHost + '/locations/managed/' + id)
  }

  add(location: EventLocation): Observable<EventLocation> {
    return this.httpClient.post<EventLocation>(environment.apiHost + '/locations', location)
  }

  findLocation(id: number): Observable<EventLocation> {
    return this.httpClient.get<EventLocation>(environment.apiHost + '/locations/' + id)
  }

  editLocation(location: EventLocation): Observable<EventLocation> {
    console.log("ID OD LOKACIJE: " + location.id)
    return this.httpClient.patch<EventLocation>(environment.apiHost + '/locations/' + location.id, location)
  }

  deleteLocation(id: number): Observable<any> {
    return this.httpClient.delete(environment.apiHost + '/locations/' + id)
  }

}
