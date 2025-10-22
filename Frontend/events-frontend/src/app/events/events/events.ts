import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '../events-service';
import {FrontendEvent} from '../model/frontendEvent';

@Component({
  selector: 'app-events',
  standalone: false,
  templateUrl: './events.html',
  styleUrl: './events.css'
})
export class Events implements OnInit {

  events: FrontendEvent[] = []


  constructor(private service: EventsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllEvents();
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

}
