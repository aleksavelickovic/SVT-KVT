import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth-service';
import {FrontendUser} from '../model/User';
import {Router} from '@angular/router';
import {EventLocation} from '../../../locations/model/eventLocation';
import {LocationsService} from '../../../locations/locations-service';
import {FrontendReview} from '../../../reviews/model/review';
import {GetReviewService} from '../../../locations/get-review-service';
import {ImageService} from '../../../images/image-service';

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

  passwordsDontMatch: boolean = false
  wrongPassword:boolean = false

  constructor(private service: AuthService, private locationsService: LocationsService, private reviewService: GetReviewService, private router: Router,
              private imageService: ImageService) {
  }

  changePassword(): void {
    const form = this.changePswForm.getRawValue()
    console.log(form.oldpassword)
    console.log(form.newpassword)
    console.log(form.newpasswordagain)
    if (form.newpassword == form.newpasswordagain) {
      this.service.changePassword(localStorage.getItem("email"), form.oldpassword, form.newpassword).subscribe({
        next: () => {
          console.log("USPESNO PROMENJENA SIFRA!")
        },
        error: (_) => {
          this.wrongPassword = true
          console.error("Greska prilikom promene sifre!")
        }
      })
    } else {
      this.passwordsDontMatch = true
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
        this.localStorage.setItem("address", user.address)
        this.localStorage.setItem("city", user.city)
        this.localStorage.setItem("email", user.email)
        this.localStorage.setItem("name", user.name)
        this.localStorage.setItem("phone_number", user.phone_number)
        console.log("USPEH")
        console.log(user)
        this.ngOnInit()
      },
      error: (_) => {
        console.error("Greska!")
      }
    })
  }

  changeProfilePicture(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.imageService.uploadImage(formData).subscribe({
          next: () => {
            console.log("USPESNO OTPREMLJENA SLIKA, editujem korisnika...")
            this.service.editProfilePicture(localStorage.getItem("email"), this.selectedFile.name).subscribe({
              next: (user: FrontendUser) => {
                console.log("Uspesno izmenjena profilna fotografija!")
                console.log(user.imageFilename) // TODO localstorage i routing
                localStorage.setItem("image", this.selectedFile.name)
                setTimeout(function() {
                  this.ngOnInit();
                }, 1000);

              },
              error: (_) => {
                console.error("Greska prilikom izmene profilne fotografije!")
              }
            })
          }
        }
      );
    }

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  protected readonly localStorage = localStorage;
}
