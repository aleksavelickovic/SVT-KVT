import {Injectable} from '@angular/core';
import {RegistrationRequest} from './model/registrationRequest';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})

export class RegistrationRequestsService {

  private registrationRequests: RegistrationRequest[] = []

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<RegistrationRequest[]> {
    return this.httpClient.get<RegistrationRequest[]>(environment.apiHost + '/users/requests')
  }

  add(registrationRequest: RegistrationRequest): Observable<RegistrationRequest> {
    return this.httpClient.post<RegistrationRequest>(environment.apiHost + '/users/requests/add', registrationRequest)
  }

  accept(id: number): Observable<RegistrationRequest> {
    return this.httpClient.patch<RegistrationRequest>(environment.apiHost + '/users/requests/' + id, '')
  }

}
