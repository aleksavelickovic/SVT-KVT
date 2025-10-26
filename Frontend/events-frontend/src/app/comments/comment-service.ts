import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../env/enviroment';
import {FrontendComment} from './model/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: FrontendComment[] = []

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<FrontendComment[]> {
    return this.httpClient.get<FrontendComment[]>(environment.apiHost + '/comments')
  }

  add(comment: FrontendComment): Observable<FrontendComment> {
    return this.httpClient.post<FrontendComment>(environment.apiHost + '/comments', comment)
  }

}
