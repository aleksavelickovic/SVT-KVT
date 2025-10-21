import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
    name: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
  })

}
