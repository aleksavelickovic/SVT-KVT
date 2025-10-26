import {Component, OnInit} from '@angular/core';
import {LocationsService} from '../locations-service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventLocation} from '../model/eventLocation';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {waitForAsync} from '@angular/core/testing';
import {FrontendEvent} from '../../events/model/frontendEvent';

import {GetReviewService} from '../get-review-service';
import {FrontendReview} from '../../reviews/model/review';
import {AuthService} from '../../infrastructure/auth/auth-service';

@Component({
  selector: 'app-locations',
  standalone: false,
  templateUrl: './locations.html',
  styleUrl: './locations.css'
})
export class Locations implements OnInit {

  locations: EventLocation[] = []
  managedLocations: EventLocation[]=[]
  reviews: FrontendReview[] = []
  role: string = ''

  // protected readonly location = location;
  // protected readonly Location = Location;

  searchForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  })


  constructor(private service: LocationsService, private reviewService: GetReviewService, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAllLocations()
    this.getAllReviews()
    this.getRole()
    this.getAllManagedLocations()
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

  getAllReviews(): void {
    this.reviewService.getAll().subscribe({
      next: (reviews: FrontendReview[]) => {
        this.reviews = reviews;
        console.log(this.reviews)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

  deleteLocation(id: number): void {
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
