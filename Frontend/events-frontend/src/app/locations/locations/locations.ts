import {Component, OnInit} from '@angular/core';
import {LocationsService} from '../locations-service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventLocation} from '../model/eventLocation';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {GetReviewService} from '../get-review-service';
import {FrontendReview} from '../../reviews/model/review';
import {AuthService} from '../../infrastructure/auth/auth-service';
import {CommentService} from '../../comments/comment-service';
import {FrontendComment} from '../../comments/model/Comment';
import {FrontendUser} from '../../infrastructure/auth/model/User';
import {ReviewService} from '../../reviews/review-service';
import {FrontendEvent} from '../../events/model/frontendEvent';
import {EventsService} from '../../events/events-service';
import {LocationSearchRequest} from '../model/locationSearchRequest';

@Component({
  selector: 'app-locations',
  standalone: false,
  templateUrl: './locations.html',
  styleUrl: './locations.css'
})
export class Locations implements OnInit {

  locations: EventLocation[] = []
  managedLocations: EventLocation[] = []
  reviews: FrontendReview[] = []
  comments: FrontendComment[] = []
  events: FrontendEvent[] = []
  currentDate = new Date()
  managers: FrontendUser[] = []
  role: string = ''

  // protected readonly location = location;
  // protected readonly Location = Location;

  searchForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    pdfText: new FormControl(''),
    reviewCountFrom: new FormControl(null),
    reviewCountTo: new FormControl(null),
    performanceFrom: new FormControl(null),
    performanceTo: new FormControl(null),
    soundFrom: new FormControl(null),
    soundTo: new FormControl(null),
    lightingFrom: new FormControl(null),
    lightingTo: new FormControl(null),
    venueFrom: new FormControl(null),
    venueTo: new FormControl(null),
    overallImpressionFrom: new FormControl(null),
    overallImpressionTo: new FormControl(null),
    operator: new FormControl('AND'),
    sortDirection: new FormControl('ASC'),
  })

  replyForm = new FormGroup({
    text: new FormControl('', Validators.required),
    repliesTo: new FormControl(null, Validators.required)
  })

  sortForm = new FormGroup({
    sortType: new FormControl(null, Validators.required),
    order: new FormControl(null, Validators.required)
  })


  constructor(private service: LocationsService, private getReviewService: GetReviewService, private route: ActivatedRoute,
              private router: Router, private authService: AuthService, private commentService: CommentService, private reviewService: ReviewService,
              private eventService: EventsService) {
  }

  ngOnInit(): void {
    this.getAllLocations()
    this.getAllReviews()
    this.getRole()
    this.getAllManagedLocations()
    this.getAllComments()
    this.getAllEvents()
  }

  addComment(repliesTo: FrontendComment | null): void {

    const rawFormData = this.replyForm.getRawValue()
    const comenteer: FrontendUser = {
      email: localStorage.getItem("email"),
      name: localStorage.getItem("name"),
      phone_number: localStorage.getItem("phone_number"),
      address: localStorage.getItem("address"),
      city: localStorage.getItem("city"),
      imageFilename: localStorage.getItem("image")
    }
    const comment: FrontendComment =
      {
        id: 0,
        text: rawFormData.text,
        createdAt: new Date(),
        belongsTo: comenteer,
        repliesTo: repliesTo
      }

    this.commentService.add(comment).subscribe({
      next: () => {
        // this.router.navigate(['../locations'])
        this.ngOnInit()
      },
      error: (_) => {
        console.error("GRESKA PRILIKOM DODAVANJA KOMENTARA!")
      }
    })

  }

  hideReview(reviewId: number): void {
    this.reviewService.hide(reviewId).subscribe({
      next: (_) => {
        this.ngOnInit()
      }
    })
  }

  getRole(): void {
    this.authService.userState.subscribe((result) => {
      this.role = result;
    })
  }

  getAllLocations(): void {
    this.service.getAll().subscribe({
      next: (locations: EventLocation[]) => {
        this.locations = locations;
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

  getAllManagedLocations(): void {
    this.service.getAllManagedLocations(Number(localStorage.getItem("id"))).subscribe({
      next: (locations: EventLocation[]) => {
        this.managedLocations = locations
        console.log(this.locations)
      },
      error: (_) => {
        console.error("Greska!")
      }
    })
  }

  getAllEvents(): void {
    this.eventService.getAll().subscribe({
      next: (events: FrontendEvent[]) => {
        this.events = events.map(e => ({
          ...e,
          date: new Date(e.date)
        }))
        console.log(this.events)
      },
      error: (_) => {
        console.error("GRESKA PRILIKOM UCITAVANJA DOGADJAJA!")
      }
    })
  }

  getAllReviews(): void {
    this.getReviewService.getAll().subscribe({
      next: (reviews: FrontendReview[]) => {
        this.reviews = reviews.map(review => ({
          ...review,
          createdAt: this.parseDate(review.createdAt) ?? new Date(0)
        }))
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

  deleteLocation(id: number | null): void {
    this.service.deleteLocation(id).subscribe({
      next: () => {
        this.getAllLocations()
        this.router.navigate(['../locations'])
        console.log(this.locations)
      },
      error: (_) => { // TODO zasto ovde vraca error kad se sve lepo izvrsi?
        console.error("GRESKA!")
        this.getAllLocations()
        this.router.navigate(['../locations'])
        console.log(this.locations)
      }
    })
    // this.getAllLocations()
  }

  searchLocations(): void {
    const criteria = this.buildSearchRequest();
    this.service.search(criteria).subscribe({
      next: (locations: EventLocation[]) => {
        this.locations = locations;
      },
      error: (_) => {
        console.error("GRESKA PRILIKOM PRETRAGE LOKACIJA!")
      }
    })
  }

  moreLikeThis(locationId: number | null): void {
    this.service.moreLikeThis(locationId).subscribe({
      next: (locations: EventLocation[]) => {
        this.locations = locations;
      },
      error: (_) => {
        console.error("GRESKA PRILIKOM PRETRAGE SLICNIH LOKACIJA!")
      }
    })
  }

  sortReviews(): void {
    const raw = this.sortForm.getRawValue()
    if (raw.sortType == "date") {
      if (raw.order == "desc") {
        this.reviews = this.reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      } else if (raw.order == "asc") {
        this.reviews = this.reviews.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
      }
    } else if (raw.sortType == "rating") {
      if (raw.order == "desc") {
        this.reviews = this.reviews.sort((a, b) => b.rate.overallImpression - a.rate.overallImpression)
      } else if (raw.order == "asc") {
        this.reviews = this.reviews.sort((a, b) => a.rate.overallImpression - b.rate.overallImpression)
      }
    }


  }

  resetFilters(): void {
    this.searchForm.reset({
      name: '',
      description: '',
      pdfText: '',
      reviewCountFrom: null,
      reviewCountTo: null,
      performanceFrom: null,
      performanceTo: null,
      soundFrom: null,
      soundTo: null,
      lightingFrom: null,
      lightingTo: null,
      venueFrom: null,
      venueTo: null,
      overallImpressionFrom: null,
      overallImpressionTo: null,
      operator: 'AND',
      sortDirection: 'ASC',
    })
    this.getAllLocations()
  }

  private buildSearchRequest(): LocationSearchRequest {
    const raw = this.searchForm.getRawValue();
    return {
      name: this.normalizeText(raw.name),
      description: this.normalizeText(raw.description),
      pdfText: this.normalizeText(raw.pdfText),
      reviewCountFrom: this.normalizeNumber(raw.reviewCountFrom),
      reviewCountTo: this.normalizeNumber(raw.reviewCountTo),
      performanceFrom: this.normalizeNumber(raw.performanceFrom),
      performanceTo: this.normalizeNumber(raw.performanceTo),
      soundFrom: this.normalizeNumber(raw.soundFrom),
      soundTo: this.normalizeNumber(raw.soundTo),
      lightingFrom: this.normalizeNumber(raw.lightingFrom),
      lightingTo: this.normalizeNumber(raw.lightingTo),
      venueFrom: this.normalizeNumber(raw.venueFrom),
      venueTo: this.normalizeNumber(raw.venueTo),
      overallImpressionFrom: this.normalizeNumber(raw.overallImpressionFrom),
      overallImpressionTo: this.normalizeNumber(raw.overallImpressionTo),
      operator: raw.operator || 'AND',
      sortDirection: raw.sortDirection || 'ASC',
    }
  }

  private normalizeText(value: string | null | undefined): string | null {
    if (value == null) {
      return null;
    }
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  private normalizeNumber(value: string | number | null | undefined): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const normalized = Number(value);
    return Number.isNaN(normalized) ? null : normalized;
  }

  parseDate(value: any): Date | null {
    const [y, m, d, h = 0, min = 0, s = 0, nano = 0] = value.map(Number);
    return new Date(y, (m || 1) - 1, d || 1, h, min, s, Math.floor((nano || 0) / 1e6));
  }


}
