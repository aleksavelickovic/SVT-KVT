import {Component, OnInit} from '@angular/core';
import {LocationsService} from '../../locations/locations-service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '../events-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FrontendEvent} from '../model/frontendEvent';
import {EventLocation} from '../../locations/model/eventLocation';

@Component({
  selector: 'app-add-event',
  standalone: false,
  templateUrl: './add-event.html',
  styleUrl: './add-event.css'
})
export class AddEvent implements OnInit {

  // event?: FrontendEvent
  locations: EventLocation[] = []
  eventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
    price: new FormControl(0.0, Validators.required),
    recurrent: new FormControl(false, Validators.required),
    location: new FormControl(Validators.required),
  })

  constructor(private service: EventsService, private locationService: LocationsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.locationService.getAll().subscribe({
      next: (locations: EventLocation[]) => {
        this.locations = locations;
        console.log(this.locations)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

  addEvent(): void {
    this.service.add(this.eventForm.getRawValue() as unknown as FrontendEvent).subscribe({
      next: () => {
        console.log("USPEH!")
        this.router.navigate(['events'])
        // this.getAllLocations()
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })

  }

}
