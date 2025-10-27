import {Component} from '@angular/core';
import {LocationsService} from '../locations-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventLocation} from '../model/eventLocation';
import {ImageService} from '../../images/image-service';

@Component({
  selector: 'app-add-location',
  standalone: false,
  templateUrl: './add-location.html',
  styleUrl: './add-location.css'
})
export class AddLocation {

  locationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
    // city: new FormControl('', Validators.required),
  })

  selectedFile: File | null = null;

  constructor(private service: LocationsService, private route: ActivatedRoute, private router: Router,
              private imageService: ImageService) {
  }

  addLocation(): void {
    console.log("POZVANA addLocation")
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      this.imageService.uploadImage(formData).subscribe({
          next: () => console.log("USPESNO OTPREMLJENA SLIKA!")
        }
      );
    }
    const raw = this.locationForm.getRawValue()
    const eventLocation: EventLocation = {
      id: 0,
      name: raw.name,
      address: raw.address,
      type: raw.type,
      description: raw.description,
      totalRating: 0,
      createdAt: null,
      imageFilename: this.selectedFile?.name
    }
    this.service.add(eventLocation).subscribe({
      next: () => {
        console.log("USPEH!")
        this.router.navigate(['locations'])
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
