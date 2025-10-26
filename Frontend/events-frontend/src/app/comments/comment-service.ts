import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventLocation} from '../locations/model/eventLocation';
import {environment} from '../env/enviroment';
import {FrontendComment} from './model/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments: FrontendComment[]=[]

  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<FrontendComment[]> {
    return this.httpClient.get<FrontendComment[]>(environment.apiHost + '/comments')
  }

}
