import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Locations} from './locations/locations';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton} from '@angular/material/button';


@NgModule({
  declarations: [
    Locations
  ],
  imports: [
    CommonModule,
    MatCardContent,
    MatCardSubtitle,
    MatCardActions,
    MatCardImage,
    NgOptimizedImage,
    MatCardTitle,
    MatButton,
    MatCardHeader,
    MatCard
  ]
})
export class LocationsModule {
}
