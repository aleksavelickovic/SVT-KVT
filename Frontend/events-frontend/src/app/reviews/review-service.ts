import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FrontendReview} from './model/review';
import {Observable} from 'rxjs';
import {environment} from '../env/enviroment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  reviews: FrontendReview[] = []

  constructor(private httpClient: HttpClient) {

  }

  add(review: FrontendReview): Observable<FrontendReview> {
    return this.httpClient.post<FrontendReview>(environment.apiHost + '/reviews', review)
  }

  hide(reviewId: number): Observable<FrontendReview> {
    return this.httpClient.patch<FrontendReview>(environment.apiHost + '/reviews/' + reviewId, null)
  }

  // getAll(): Observable<FrontendReview[]> {
  //   return this.httpClient.get<FrontendReview[]>(environment.apiHost + '/reviews')
  // }
}
