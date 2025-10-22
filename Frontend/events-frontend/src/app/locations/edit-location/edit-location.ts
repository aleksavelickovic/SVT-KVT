import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventLocation} from '../model/eventLocation';
import {ActivatedRoute} from '@angular/router';
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
    description: new FormControl(this.location?.description, Validators.required)

  })

  constructor(private route: ActivatedRoute, private service: LocationsService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id']
      this.service.findLocation(id).subscribe({
        next: (location: EventLocation) => {
          this.location = location
          console.log(this.location)
        }
      })
    })
  }

}
