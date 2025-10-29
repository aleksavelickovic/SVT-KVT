import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventLocation} from '../model/eventLocation';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {LocationsService} from '../locations-service';
import {FrontendUser} from '../../infrastructure/auth/model/User';
import {AuthService} from '../../infrastructure/auth/auth-service';
import {FrontendEvent} from '../../events/model/frontendEvent';
import {EventsService} from '../../events/events-service';
import {Chart, registerables} from 'chart.js';

Chart.register(...registerables);


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

  events: FrontendEvent[] = [];
  filteredEvents: FrontendEvent[] = [];

  fromDate!: string;
  toDate!: string;

  eventTypeChart: any;
  freePaidChart: any;
  mostExpensiveChart: any;
  cheapestChart: any;

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
              private userService: AuthService, private eventService: EventsService) {

  }

  applyFilter() {
    const from = new Date(this.fromDate);
    const to = new Date(this.toDate);

    this.filteredEvents = this.events.filter(e => {
      const d = new Date(e.date);
      return (!this.fromDate || d >= from) && (!this.toDate || d <= to);
    });

    this.updateCharts();
  }

  getCounts() {
    const regular = this.filteredEvents.filter(e => e.recurrent).length;
    const irregular = this.filteredEvents.length - regular;

    const free = this.filteredEvents.filter(e => e.price <= 0).length;
    const paid = this.filteredEvents.length - free;

    return {regular, irregular, free, paid};
  }

  mostExpensiveEvents() {
    return [...this.filteredEvents]
      .sort((a, b) => b.price - a.price)
  }

  cheapestEvents() {
    return [...this.filteredEvents]
      .sort((a, b) => a.price - b.price)
  }

  updateCharts() {
    const {regular, irregular, free, paid} = this.getCounts();

    this.eventTypeChart?.destroy();
    this.freePaidChart?.destroy();
    this.mostExpensiveChart?.destroy();
    this.cheapestChart?.destroy();

    this.eventTypeChart = new Chart('eventTypeChart', {
      type: 'pie',
      data: {
        labels: ['Redovni', 'Neredovni'],
        datasets: [{data: [regular, irregular]}]
      }
    });

    this.freePaidChart = new Chart('freePaidChart', {
      type: 'pie',
      data: {
        labels: ['Besplatni', 'Plaćeni'],
        datasets: [{data: [free, paid]}]
      }
    });

    const expensive = this.mostExpensiveEvents();
    this.mostExpensiveChart = new Chart('topChart', {
      type: 'bar',
      data: {
        labels: expensive.map(e => e.name),
        datasets: [{data: expensive.map(e => e.price)}]
      },
      options: {
        indexAxis: 'y'
      }
    });

    const cheapest = this.cheapestEvents();
    this.cheapestChart = new Chart('worstChart', {
      type: 'bar',
      data: {
        labels: cheapest.map(e => e.name),
        datasets: [{data: cheapest.map(e => e.price)}]
      },
      options: {
        indexAxis: 'y'
      }
    });
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
        this.ngOnInit()
      }
    })
  }

  addManager(): void {
    const managerEmail = this.managerForm.getRawValue().email
    const locationId = this.location?.id;
    this.service.addManager(managerEmail, locationId).subscribe({
      next: () => {
        this.ngOnInit()
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
    this.eventService.getAll().subscribe({
      next: (events: FrontendEvent[]) => {
        this.events = events.map(e => ({
          ...e,
          date: new Date(e.date)
        })).filter(event => event.location.name == this.location.name)
        console.log(events)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

}
