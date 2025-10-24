import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FrontendReview} from './model/review';
import {Observable} from 'rxjs';
import {EventLocation} from './model/eventLocation';
import {environment} from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviews: FrontendReview[] = []

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<FrontendReview[]> {
    return this.httpClient.get<FrontendReview[]>(environment.apiHost + '/reviews')
  }

}
