import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth-service';
import {FrontendUser} from '../model/User';
import {Router} from '@angular/router';
import {EventLocation} from '../../../locations/model/eventLocation';
import {LocationsService} from '../../../locations/locations-service';
import {FrontendReview} from '../../../reviews/model/review';
import {GetReviewService} from '../../../locations/get-review-service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  locations: EventLocation[] = []
  reviews: FrontendReview[] = []
  selectedFile: File | null = null;

  profileForm = new FormGroup({
    email: new FormControl(localStorage.getItem("email"), Validators.email),
    // password: new FormControl('', Validators.required),                         // TODO promena lozinke
    name: new FormControl(localStorage.getItem("name"), Validators.required),
    phone_number: new FormControl(localStorage.getItem("phone_number"), Validators.required),
    address: new FormControl(localStorage.getItem("address"), Validators.required),
    city: new FormControl(localStorage.getItem("city"), Validators.required),


  })

  changePswForm = new FormGroup({
    oldpassword: new FormControl('', Validators.required),
    newpassword: new FormControl('', Validators.required),
    newpasswordagain: new FormControl('', Validators.required)
  })

  constructor(private service: AuthService, private locationsService: LocationsService, private reviewService: GetReviewService, private router: Router) {
  }

  changePassword(): void {
    const form = this.changePswForm.getRawValue()
    console.log(form.oldpassword)
    console.log(form.newpassword)
    console.log(form.newpasswordagain)
    if (form.newpassword == form.newpasswordagain){
      this.service.changePassword(localStorage.getItem("email"), form.oldpassword, form.newpassword).subscribe({
        next: () => {
          console.log("USPESNO PROMENJENA SIFRA!")
        },
        error: (_) => {
          console.error("Greska prilikom promene sifre!")
        }
      })
    } else{
      console.error("LOZINKE SE NE POKLAPAJU!")
    }

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
    this.reviewService.getAll().subscribe({
      next: (reviews: FrontendReview[]) => {
        this.reviews = reviews
        console.log(this.reviews)
      },
      error: (_) => {
        console.error("Greska!")
      }
    })
  }

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

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  protected readonly localStorage = localStorage;
}
