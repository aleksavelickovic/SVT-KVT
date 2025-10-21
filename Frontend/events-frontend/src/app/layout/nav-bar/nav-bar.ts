import {Component} from '@angular/core';
import {AuthService} from '../../infrastructure/auth/auth-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: false,
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css'
})
export class NavBar {
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    })
  }

  logOut(): void {
    localStorage.removeItem('user');
    this.authService.setUser();
    this.router.navigate(['login']);
  }

}
