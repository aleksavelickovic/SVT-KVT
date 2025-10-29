import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth-service';
import {LocationsService} from '../../../locations/locations-service';
import {GetReviewService} from '../../../locations/get-review-service';
import {Router} from '@angular/router';
import {ImageService} from '../../../images/image-service';
import {FrontendUser} from '../model/User';

@Component({
  selector: 'app-setup',
  standalone: false,
  templateUrl: './setup.html',
  styleUrl: './setup.css'
})
export class Setup {

  setupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    email: new FormControl(localStorage.getItem("email"), Validators.required),
    address: new FormControl(localStorage.getItem("address"), Validators.required),
    imageFilename: new FormControl(localStorage.getItem("image"), Validators.required),
  })

  constructor(private service: AuthService, private locationsService: LocationsService, private reviewService: GetReviewService, private router: Router,
              private imageService: ImageService) {
  }

  setupUser(): void {
    this.service.editUser(this.setupForm.getRawValue() as FrontendUser).subscribe({
      next: (user: FrontendUser) => {
        console.log("USPEH")
        console.log(user) // TODO localstorage i routing
        this.router.navigate(['../home'])
      },
      error: (_) => {
        console.error("Greska!")
      }
    })
  }

  protected readonly localStorage = localStorage;
}
