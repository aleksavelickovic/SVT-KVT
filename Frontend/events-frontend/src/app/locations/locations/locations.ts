import {Component, OnInit} from '@angular/core';
import {LocationsService} from '../locations-service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventLocation} from '../model/eventLocation';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {waitForAsync} from '@angular/core/testing';

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

  searchForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  })

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


}
