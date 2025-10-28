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
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
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
        location.reload()
      },
      error: (_) => {
        console.error("GRESKA PRILIKOM DODAVANJA KOMENTARA!")
      }
    })

  }

  hideReview(reviewId: number): void {
    this.reviewService.hide(reviewId).subscribe({
      next: (_) => {
        location.reload()
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
        console.log(this.locations)
        console.log(this.locations[2].imageFilename)
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
        this.events = events;
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
    this.getAllLocations()
    setTimeout(() => {
      console.log("Pocinjem sa pretragom...");
      const raw = this.searchForm.getRawValue();
      const name = raw.name;
      const address = raw.address;
      const type = raw.type;
      console.log(name)
      console.log(address)
      console.log(type)
      if (name?.trim().length != 0) {
        this.locations = this.locations.filter(l => l.name == name);
        console.log(this.locations)
      }
      if (address?.trim().length != 0) {
        this.locations = this.locations.filter(l => l.address == address);
        console.log(this.locations)
      }
      if (type?.trim().length != 0) {
        this.locations = this.locations.filter(l => l.type == type);
        console.log(this.locations)
      }
    }, 50);
  }

  resetFilters(): void {
    this.getAllLocations()
  }


}
