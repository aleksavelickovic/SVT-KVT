import {Component} from '@angular/core';
import {AuthService} from '../auth-service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Login} from '../model/loginModel';
import {AuthResponse} from '../model/AuthResponse';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required)
  })

  constructor(private authService: AuthService, private router: Router) {

  }

  login(): void {

    if (this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(login).subscribe({
        next: (response: AuthResponse) => {
          console.log("ID: " + response.id)
          localStorage.setItem("id", String(response.id))
          console.log("TOKEN: " + response.accessToken)
          console.log("ISTICE ZA: " + response.expiresIn)
          localStorage.setItem('user', response.accessToken);
          this.authService.setUser()
          console.log(response.name)
          localStorage.setItem("name", response.name)
          console.log(response.email)
          localStorage.setItem("email", response.email)
          localStorage.setItem("phone_number", response.phone_number)
          localStorage.setItem("address", response.address)
          localStorage.setItem("city", response.city)
          localStorage.setItem("image", response.imageFilename)

          console.log(response.password) // TODO vraca se hash-ovan password

          // this.router.navigate(['home'])
          console.log("USPESAN LOGIN!!!")
        }
      })
    }
  }


}
