import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ReviewService} from '../../reviews/review-service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '../../events/events-service';
import {FrontendEvent} from '../../events/model/frontendEvent';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FrontendRate} from '../../reviews/model/Rate';
import {FrontendReview} from '../../reviews/model/review';
import {FrontendComment} from '../../comments/model/Comment';
import {FrontendUser} from '../../infrastructure/auth/model/User';

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
    event: new FormControl(Validators.required),
    commentText: new FormControl('', Validators.required)
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
      overallImpression: Number(raw.overallImpression),
    };
    const comenteer: FrontendUser = {
      email: localStorage.getItem("email"),
      name: localStorage.getItem("name"),
      phone_number: localStorage.getItem("phone_number"),
      address: localStorage.getItem("address"),
      city: localStorage.getItem("city")
    }
    const comment: FrontendComment = {
      id: 0,
      text: raw.commentText,
      createdAt: new Date(),
      belongsTo: comenteer,
      repliesTo: null
    }
    const selectedEvent = raw.event as unknown as FrontendEvent
    const review: FrontendReview = {
      id: 0, // placeholder; backend may overwrite
      createdAt: new Date(),
      eventCount: 0,
      hidden: false as unknown as Boolean,
      event: selectedEvent,
      rate,
      madeBy: localStorage.getItem("name"),
      comment
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
