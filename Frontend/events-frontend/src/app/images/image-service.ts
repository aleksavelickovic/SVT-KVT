import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {
  }

  uploadImage(formData: FormData): Observable<string> {
    return this.http.post(environment.apiHost + '/images', formData, {
      responseType: 'text'
    });
  }

  uploadDocument(formData: FormData): Observable<string> {
    return this.http.post(environment.apiHost + '/documents', formData, {
      responseType: 'text'
    });
  }

}
