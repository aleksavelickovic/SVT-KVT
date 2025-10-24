import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth-service';
import {RegistrationRequest} from '../../../registration-requests/model/registrationRequest';
import {FrontendUser} from '../model/User';
import {Route, Router} from '@angular/router';
import {EventLocation} from '../../../locations/model/eventLocation';
import {LocationsService} from '../../../locations/locations-service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  locations: EventLocation[] = []

  constructor(private service: AuthService, private locationsService: LocationsService, private reviewService: ReviewService, private router: Router) {
  }

  ngOnInit(): void {
    this.locationsService.getAllManagedLocations(Number(localStorage.getItem("id"))).subscribe({
      next: (locations: EventLocation[]) => {
        this.locations = locations
        console.log(this.locations)
      },
      error: (_) => {
        console.error("Greska!")
      }
    })
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
