import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventLocation} from '../model/eventLocation';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationsService} from '../locations-service';

@Component({
  selector: 'app-edit-location',
  standalone: false,
  templateUrl: './edit-location.html',
  styleUrl: './edit-location.css'
})
export class EditLocation implements OnInit {


  location?: EventLocation
  locationForm = new FormGroup({
    name: new FormControl(this.location?.name, Validators.required),
    address: new FormControl(this.location?.address, Validators.required),
    type: new FormControl(this.location?.type, Validators.required),
    description: new FormControl(this.location?.description, Validators.required),
    id: new FormControl(this.location?.id, Validators.required),
  })

  constructor(private route: ActivatedRoute, private service: LocationsService, private router: Router) {

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

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id']
      this.service.findLocation(id).subscribe({
        next: (location: EventLocation) => {
          this.location = location
          this.locationForm.patchValue(location);
          console.log(this.location)
        }
      })
    })
  }

}
