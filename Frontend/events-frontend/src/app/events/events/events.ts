import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '../events-service';
import {FrontendEvent} from '../model/frontendEvent';
import {FormControl, FormGroup, Validators, ɵRawValue} from '@angular/forms';
import {AddEvent} from '../add-event/add-event';
import {EventLocation} from '../../locations/model/eventLocation';
import {LocationsService} from '../../locations/locations-service';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events implements OnInit {

  events: FrontendEvent[] = []
  locations: EventLocation[] = []
  managedLocations: EventLocation[] = []


  searchFormEvents = new FormGroup({
    type: new FormControl('', Validators.required),
    location: new FormControl(this.locations[0], Validators.required),
    address: new FormControl('', Validators.required),
    price: new FormControl(null, Validators.required)
  })


  constructor(private service: EventsService, private locationService: LocationsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllEvents();
    this.getAllManagedLocations()
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

  getAllEvents(): void {
    this.service.getAll().subscribe({
      next: (events: FrontendEvent[]) => {
        this.events = events
        console.log(events)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

  getAllManagedLocations(): void {
    this.locationService.getAllManagedLocations(Number(localStorage.getItem("id"))).subscribe({
      next: (locations: EventLocation[]) => {
        this.managedLocations = locations
        console.log(this.locations)
      },
      error: (_) => {
        console.error("Greska!")
      }
    })
  }

  deleteEvent(id: number): void {
    this.service.deleteEvent(id).subscribe({
      next: () => {
        this.getAllEvents()
        this.router.navigate(['../events'])
        console.log(this.events)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })

  }

  filterEvents(): void {
    this.getAllEvents()
    setTimeout(() => {
      console.log("Pocinjem sa pretragom...");
      const raw = this.searchFormEvents.getRawValue();
      const address = raw.address;
      const type = raw.type;
      const price = raw.price;
      const location: ɵRawValue<FormControl<EventLocation | null>> = raw.location
      console.log(address)
      console.log(type)
      console.log(price)
      console.log(location)
      if (address?.trim().length != 0) {
        this.events = this.events.filter(e => e.address == address);
        console.log(this.events)
      }
      if (type?.trim().length != 0) {
        this.events = this.events.filter(e => e.type == type);
        console.log(this.events)
      }
      if (price != null && price == 0) {
        this.events = this.events.filter(e => e.price == 0);
        console.log(this.events)
      } else if (price != null && price > 0) {
        this.events = this.events.filter(e => e.price == price);
        console.log(this.events)
      }
      if (location != null) {
        this.events = this.events.filter(e => e.location.name == location.name);
        console.log(this.events)
      }
    }, 50);
  }

  resetFilters(): void {
    this.getAllEvents()
  }

  protected readonly AddEvent = AddEvent;
}
