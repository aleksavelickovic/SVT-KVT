import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventLocation} from '../model/eventLocation';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationsService} from '../locations-service';
import {FrontendUser} from '../../infrastructure/auth/model/User';
import {AuthService} from '../../infrastructure/auth/auth-service';

@Component({
  selector: 'app-edit-location',
  standalone: false,
  templateUrl: './edit-location.html',
  styleUrl: './edit-location.css'
})
export class EditLocation implements OnInit {


  location?: EventLocation
  managers: FrontendUser[] = []
  role: string = ''

  locationForm = new FormGroup({
    name: new FormControl(this.location?.name, Validators.required),
    address: new FormControl(this.location?.address, Validators.required),
    type: new FormControl(this.location?.type, Validators.required),
    description: new FormControl(this.location?.description, Validators.required),
    id: new FormControl(this.location?.id, Validators.required),
  })

  managerForm = new FormGroup({
    email: new FormControl('', Validators.required),
  })

  constructor(private route: ActivatedRoute, private service: LocationsService, private router: Router,
              private userService: AuthService) {

  }

  editLocation(): void {
    this.service.editLocation(this.locationForm.getRawValue() as EventLocation).subscribe({
      next: () => {
        console.log("USPEH!")
        this.router.navigate(['locations'])
      },
      error: () => {
        console.error("GRESKA PRILIKOM IZMENE LOKACIJE!")
      }
    })
  }

  getAllManagers(locationId: number): void {
    this.service.getAllManagers(locationId).subscribe({
      next: (managers: FrontendUser[]) => {
        this.managers = managers;
        console.log(this.managers)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

  removeManager(email: string | null): void {
    const id: number | null | undefined = this.location?.id
    this.userService.removeManager(email, id).subscribe({
      next: () => {
        location.reload()
      }
    })
  }

  addManager(): void {
    const managerEmail = this.managerForm.getRawValue().email
    const locationId = this.location?.id;
    this.service.addManager(managerEmail, locationId).subscribe({
      next: () => {
        location.reload()
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = +params['id']
      this.service.findLocation(id).subscribe({
        next: (location: EventLocation) => {
          this.location = location
          this.locationForm.patchValue(location);
          console.log(this.location)
          this.getAllManagers(id)
        }
      })
    })
    this.userService.userState.subscribe((result) => {
      this.role = result;
    })

  }

}
