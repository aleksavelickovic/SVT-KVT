import {Injectable, Resource} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../env/enviroment';
import {EventLocation} from './model/eventLocation';
import {FrontendUser} from '../infrastructure/auth/model/User';

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

  getAllManagers(locationId: number): Observable<FrontendUser[]> {
    return this.httpClient.get<FrontendUser[]>(environment.apiHost + '/locations/' + locationId + '/managers')
  }

  addManager(email: string | null | undefined, locationId: number | null | undefined): Observable<EventLocation> {
    return this.httpClient.patch<EventLocation>(environment.apiHost + '/locations/' + locationId + '/' + email, null)
  }

  add(location: EventLocation): Observable<EventLocation> {
    return this.httpClient.post<EventLocation>(environment.apiHost + '/locations', location)
  }

  findLocation(id: number): Observable<EventLocation> {
    return this.httpClient.get<EventLocation>(environment.apiHost + '/locations/' + id)
  }

  getImage(filename: string): Observable<Resource<any>> {
    return this.httpClient.get<Resource<any>>(environment.apiHost + '/images/' + filename)
  }

  editLocation(location: EventLocation): Observable<EventLocation> {
    console.log("ID OD LOKACIJE: " + location.id)
    return this.httpClient.patch<EventLocation>(environment.apiHost + '/locations/' + location.id, location)
  }

  deleteLocation(id: number): Observable<any> {
    return this.httpClient.delete(environment.apiHost + '/locations/' + id)
  }

}
