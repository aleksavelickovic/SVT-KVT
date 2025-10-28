import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../env/enviroment';
import {AuthResponse} from './model/AuthResponse';
import {FrontendUser} from './model/User';
import {EventLocation} from '../../locations/model/eventLocation';


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

  removeManager(email: string | null, location: number | null | undefined): Observable<EventLocation> {
    return this.http.patch<EventLocation>(environment.apiHost + '/users/' + email + '/' + location, null)
  }

  editUser(user: FrontendUser): Observable<FrontendUser> {
    return this.http.patch<FrontendUser>(environment.apiHost + '/users', user)
  }

  editProfilePicture(userEmail: string, imageFilename: string): Observable<FrontendUser> {
    return this.http.patch<FrontendUser>(environment.apiHost + '/users/' + userEmail + '/image/' + imageFilename, null)
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
