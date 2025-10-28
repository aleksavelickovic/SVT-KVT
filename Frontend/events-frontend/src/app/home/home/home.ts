import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../events/events-service';
import {FrontendEvent} from '../../events/model/frontendEvent';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  events: FrontendEvent[] = []
  currentDate: Date = new Date()

  constructor(private service: EventsService) {
  }

  ngOnInit(): void {
    this.getAllEvents()
  }

  getAllEvents(): void {
    this.service.getAll().subscribe({
      next: (events: FrontendEvent[]) => {
        this.events = events
        this.events = events.map(e => ({
          ...e,
          date: new Date(e.date)
        }))
        console.log(events)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

}
