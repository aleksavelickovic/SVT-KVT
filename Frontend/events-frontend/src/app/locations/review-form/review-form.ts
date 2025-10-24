import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ReviewService} from '../../reviews/review-service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '../../events/events-service';
import {FrontendEvent} from '../../events/model/frontendEvent';
import {EventLocation} from '../../locations/model/eventLocation';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FrontendRate} from '../../reviews/model/Rate';
import {FrontendReview} from '../../reviews/model/review';

@Component({
  selector: 'app-review-form',
  standalone: false,
  templateUrl: './review-form.html',
  styleUrl: './review-form.css'
})
export class ReviewForm implements OnInit {

  events: FrontendEvent[] = []

  @Output()
  submitted: EventEmitter<any> = new EventEmitter<any>();

  reviewForm = new FormGroup({
    performance: new FormControl(0, Validators.required),
    soundAndLightning: new FormControl(0, Validators.required),
    venue: new FormControl(0, Validators.required),
    overallImpression: new FormControl(0, Validators.required),
    event: new FormControl('', Validators.required),
  })

  constructor(private service: ReviewService, private eventsService: EventsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.eventsService.getAll().subscribe({
      next: (events: FrontendEvent[]) => {
        this.events = events;
        console.log(this.events)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

  addReview(): void {
    const raw = this.reviewForm.getRawValue();
    const rate: FrontendRate = {
      id: 0,
      performance: Number(raw.performance),
      soundAndLightning: Number(raw.soundAndLightning),
      venue: Number(raw.venue),
      overallImpression: Number(raw.overallImpression)
    };
    const selectedEvent = this.events.find(e => e.id === Number(raw.event));
    const review: FrontendReview = {
      id: 0, // placeholder; backend may overwrite
      createdAt: new Date(),
      eventCount: 0,
      hidden: false as unknown as Boolean,
      event: selectedEvent?.id,
      rate,
      madeBy: localStorage.getItem("name")
    };
    console.error(review)
    this.service.add(review).subscribe({
      next: () => {
        console.log("USPEH!!!!!!!!!!!!!!!!!!!!!!!")
        this.submitted.emit()
        // this.eventsService.getAll().subscribe({
        //   next: (events: FrontendEvent[]) => {
        //     this.events = events;
        //     console.log(this.events)
        //   },
        //   error: (_) => {
        //     console.error("GRESKA!")
        //   }
        // })
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {  // TODO prosledi roditeljskoj komponenti event
          this.router.navigate(['/locations']);
        });

        // this.getAllLocations()
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })


  }

  protected readonly localStorage = localStorage;
}
