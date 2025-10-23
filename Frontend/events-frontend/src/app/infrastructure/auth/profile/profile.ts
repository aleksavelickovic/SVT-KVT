import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth-service';
import {RegistrationRequest} from '../../../registration-requests/model/registrationRequest';
import {FrontendUser} from '../model/User';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  constructor(private service: AuthService, private router: Router) {
  }

  profileForm = new FormGroup({
    email: new FormControl(localStorage.getItem("email"), Validators.email),
    // password: new FormControl('', Validators.required),                         // TODO promena lozinke
    name: new FormControl(localStorage.getItem("name"), Validators.required),
    phone_number: new FormControl(localStorage.getItem("phone_number"), Validators.required),
    address: new FormControl(localStorage.getItem("address"), Validators.required),
    city: new FormControl(localStorage.getItem("city"), Validators.required)

  })

  editUser(): void {
    this.service.editUser(this.profileForm.getRawValue() as FrontendUser).subscribe({
      next: (user: FrontendUser) => {
        console.log("USPEH")
        console.log(user) // TODO localstorage i routing
      },
      error: (_) => {
        console.error("Greska!")
      }
    })
  }

}
