import {Component, OnInit} from '@angular/core';
import {LocationsService} from '../locations-service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventLocation} from '../model/eventLocation';

@Component({
  selector: 'app-locations',
  standalone: false,
  templateUrl: './locations.html',
  styleUrl: './locations.css'
})
export class Locations implements OnInit {

  locations: EventLocation[] = []
  protected readonly location = location;
  protected readonly Location = Location;

  constructor(private service: LocationsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllLocations()
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

  deleteLocation(id: number): void {
    this.service.deleteLocation(id).subscribe({
      next: () => {
        this.getAllLocations()
        this.router.navigate(['../locations'])
        console.log(this.locations)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
    // this.getAllLocations()
  }


}
