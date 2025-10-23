import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocationsModule} from '../locations/locations-module';
import {EventsModule} from '../events/events-module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatFormField} from '@angular/material/input';
import {MatInput, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';



@NgModule({
  declarations: [

  ],
  exports: [

  ],
  imports: [
    CommonModule,
    LocationsModule,
    EventsModule,
    FormsModule,
    MatButton,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ]
})
export class ReviewsModule { }
