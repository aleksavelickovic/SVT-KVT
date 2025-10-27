import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  uploadImage(formData: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', environment.apiHost + '/images', formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

}
