import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../env/enviroment';
import {AuthResponse} from './model/AuthResponse';
import {FrontendUser} from './model/User';
import {FrontendReview} from '../../reviews/model/review';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: BehaviorSubject<string> = new BehaviorSubject("");
  userState: Observable<string> = this.user$.asObservable();
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  login(auth: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost + '/users/login', auth, {
      headers: this.headers,
    });
  }

  changePassword(email: string | null, oldpassword: string | null, newpassword: string | null): Observable<FrontendUser> {
    const body = {
      oldpassword: oldpassword,
      newpassword: newpassword
    };
    return this.http.patch<FrontendUser>(environment.apiHost + '/users/' + email, body)
  }

  editUser(user: FrontendUser): Observable<FrontendUser> {
    return this.http.patch<FrontendUser>(environment.apiHost + '/users', user)
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accesToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accesToken).role.authority
    }
    return null;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

}
