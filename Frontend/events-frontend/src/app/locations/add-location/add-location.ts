import {Component} from '@angular/core';
import {LocationsService} from '../locations-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventLocation} from '../model/eventLocation';
import {ImageService} from '../../images/image-service';
import {forkJoin, of} from 'rxjs';

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
  selectedDocument: File | null = null;

  constructor(private service: LocationsService, private route: ActivatedRoute, private router: Router,
              private imageService: ImageService) {
  }

  addLocation(): void {
    const imageUpload$ = this.selectedFile
      ? this.uploadFile(this.imageService.uploadImage.bind(this.imageService), this.selectedFile)
      : of(null);
    const documentUpload$ = this.selectedDocument
      ? this.uploadFile(this.imageService.uploadDocument.bind(this.imageService), this.selectedDocument)
      : of(null);

    forkJoin([imageUpload$, documentUpload$]).subscribe({
      next: () => {
        const raw = this.locationForm.getRawValue();
        const eventLocation: EventLocation = {
          id: 0,
          name: raw.name,
          address: raw.address,
          type: raw.type,
          description: raw.description,
          totalRating: 0,
          createdAt: null,
          imageFilename: this.selectedFile?.name,
          documentFilename: this.selectedDocument?.name
        };
        this.service.add(eventLocation).subscribe({
          next: () => {
            this.router.navigate(['locations'])
          },
          error: (_) => {
            console.error("GRESKA!")
          }
        })
      },
      error: (_) => {
        console.error("GRESKA PRILIKOM OTPREME FAJLA!")
      }
    })
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onDocumentSelected(event: any): void {
    this.selectedDocument = event.target.files[0];
  }

  private uploadFile(uploadMethod: (formData: FormData) => any, file: File) {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return uploadMethod(formData);
  }

}
