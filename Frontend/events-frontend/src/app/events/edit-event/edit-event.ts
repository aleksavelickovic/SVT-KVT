import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocationsService} from '../../locations/locations-service';
import {FrontendEvent} from '../model/frontendEvent';
import {EventsService} from '../events-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventLocation} from '../../locations/model/eventLocation';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-edit-event',
  standalone: false,
  templateUrl: './edit-event.html',
  styleUrl: './edit-event.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditEvent implements OnInit {

  event?: FrontendEvent
  locations: EventLocation[] = []
  eventForm = new FormGroup({
    name: new FormControl(this.event?.name, Validators.required),
    address: new FormControl(this.event?.address, Validators.required),
    type: new FormControl(this.event?.type, Validators.required),
    date: new FormControl(this.event?.date, Validators.required),
    price: new FormControl(this.event?.price, Validators.required),
    recurrent: new FormControl(this.event?.recurrent, Validators.required),
    id: new FormControl(this.event?.id, Validators.required),
    location: new FormControl(this.event?.location, Validators.required),
  })

  constructor(private route: ActivatedRoute, private service: EventsService, private router: Router, private locationService: LocationsService) {

  }

  editEvent(): void {
    this.service.editEvent(this.eventForm.getRawValue() as FrontendEvent).subscribe({
      next: () => {
        console.log("USPEH!")
        this.router.navigate(['events'])
      },
      error: () => {
        console.error("GRESKA PRILIKOM IZMENE DOGADJAJA!")
      }
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id']
      this.service.findEvent(id).subscribe({
        next: (event: FrontendEvent) => {
          this.event = event
          this.eventForm.patchValue(event);
          console.log(this.event)
        }
      })
    })
    this.locationService.getAll().subscribe({
      next: (locations: EventLocation[]) => {
        this.locations = locations;
        const selectedLoc = this.locations.find(l => l.id === this.event?.location.id);
        this.eventForm.patchValue({
          location: selectedLoc
        });
        console.log(this.locations)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

  protected readonly Event = Event;
}
