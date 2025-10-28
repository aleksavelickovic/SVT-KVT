import {Component, OnInit} from '@angular/core';
import {LocationsService} from '../../locations/locations-service';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '../events-service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FrontendEvent} from '../model/frontendEvent';
import {EventLocation} from '../../locations/model/eventLocation';
import {ImageService} from '../../images/image-service';

@Component({
  selector: 'app-add-event',
  standalone: false,
  templateUrl: './add-event.html',
  styleUrl: './add-event.css'
})
export class AddEvent implements OnInit {

  // event?: FrontendEvent
  public locations: EventLocation[] = []
  selectedFile: File | null = null;

  eventForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
    price: new FormControl(0.0, Validators.required),
    recurrent: new FormControl(false, Validators.required),
    location: new FormControl(null, Validators.required),
  })

  constructor(private service: EventsService, private locationService: LocationsService, private route: ActivatedRoute, private router: Router,
              private imageService: ImageService) {
  }

  ngOnInit(): void {
    this.locationService.getAll().subscribe({
      next: (locations: EventLocation[]) => {
        this.locations = locations;
        console.log(this.locations)
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

  addEvent(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.imageService.uploadImage(formData).subscribe({
          next: () => console.log("USPESNO OTPREMLJENA SLIKA!")
        }
      );
    }
    const raw = this.eventForm.getRawValue()
    const event: FrontendEvent = {
      id: 0,
      name: raw.name,
      address: raw.address,
      type: raw.type,
      date: raw.date,
      price: raw.price,
      recurrent: raw.recurrent,
      location: raw.location,
      imageFilename: this.selectedFile.name
    }

    this.service.add(event).subscribe({
      next: () => {
        console.log("USPEH!")
        this.router.navigate(['events'])
        // this.getAllLocations()
      },
      error: (_) => {
        console.error("GRESKA!")
      }
    })
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

}
