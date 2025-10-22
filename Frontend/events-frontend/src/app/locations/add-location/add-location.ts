import {Component} from '@angular/core';
import {LocationsService} from '../locations-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventLocation} from '../model/eventLocation';

@Component({
  selector: 'app-add-location',
  standalone: false,
  templateUrl: './add-location.html',
  styleUrl: './add-location.css'
})
export class AddLocation {

  locationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
    // city: new FormControl('', Validators.required),
  })

  constructor(private service: LocationsService, private route: ActivatedRoute, private router: Router) {
  }

  addLocation(): void {
    console.log("POZVANA addLocation")
    this.service.add(this.locationForm.getRawValue() as EventLocation).subscribe({
      next: () => {
        console.log("USPEH!")
        this.router.navigate(['locations'])
        // this.getAllLocations()
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

}
