import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationRequestsService} from '../../../registration-requests/registration-requests-service';
import {Router} from '@angular/router';
import {RegistrationRequest} from '../../../registration-requests/model/registrationRequest';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  registerForm = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  })

  constructor(private service: RegistrationRequestsService, private router: Router) {
  }

  create(): void {
    if (this.registerForm.valid) {
      const registrationRequest: RegistrationRequest = this.registerForm.getRawValue() as RegistrationRequest;

      this.service.add(registrationRequest).subscribe({
        next: (registrationRequest: RegistrationRequest) => {
          console.log("USPEH")
        },
        error: (_) => {
          console.log("Greska!")
        }
      })
    }
  }

}
