import {Component, OnInit} from '@angular/core';
import {EventsService} from '../../events/events-service';
import {FrontendEvent} from '../../events/model/frontendEvent';
import {EventLocation} from '../../locations/model/eventLocation';
import {LocationsService} from '../../locations/locations-service';
import {FrontendReview} from '../../reviews/model/review';
import {FrontendComment} from '../../comments/model/Comment';
import {GetReviewService} from '../../locations/get-review-service';
import {CommentService} from '../../comments/comment-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  events: FrontendEvent[] = []
  locations: EventLocation[] = []
  reviews: FrontendReview[] = []
  comments: FrontendComment[] = []
  currentDate: Date = new Date()

  constructor(private eventsService: EventsService, private locationsService: LocationsService, private getReviewService: GetReviewService,
              private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.getAllEvents()
    this.getAllLocations()
    this.getAllReviews()
    this.getAllComments()
  }

  getAllEvents(): void {
    this.eventsService.getAll().subscribe({
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

  getAllLocations(): void {
    this.locationsService.getAll().subscribe({
      next: (locations: EventLocation[]) => {
        this.locations = locations.sort((a, b) => b.totalRating - a.totalRating).slice(0, 3);
        console.log(this.locations)
        console.log(this.locations[2].imageFilename)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

  getAllReviews(): void {
    this.getReviewService.getAll().subscribe({
      next: (reviews: FrontendReview[]) => {
        this.reviews = reviews.map(review => ({
          ...review,
          createdAt: new Date(review.createdAt)
        }))
        this.reviews = reviews;
        console.log(this.reviews)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

  getAllComments(): void {
    this.commentService.getAll().subscribe({
      next: (comments: FrontendComment[]) => {
        this.comments = comments;
        console.log(this.comments)
      },
      error: (_) => {
        console.error("GRESKA PRILIKOM UCITAVANJA KOMENTARA!")
      }
    })
  }

  getReviewsForLocation(locationId: number): FrontendReview[] {
    if (!this.reviews || this.reviews.length === 0) return [];
    return this.reviews
      .filter(r => r.event?.location?.id == locationId && !r.hidden)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 3);
  }

  protected readonly location = location;
}
