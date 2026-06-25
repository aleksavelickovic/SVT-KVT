import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Locations} from './locations/locations';
import {AddLocation} from './add-location/add-location';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MaterialModule} from '../material/material-module';
import {EditLocation} from './edit-location/edit-location';
import {ReviewForm} from './review-form/review-form';
import {MatOptgroup, MatOption} from "@angular/material/core";
import {MatSelect} from '@angular/material/select';
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from '@angular/material/list';

@NgModule({
  declarations: [
    Locations,
    AddLocation,
    EditLocation,
    ReviewForm
  ],
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptgroup,
    MatOption,
    MatSelect,
    MatIcon,
    MatDivider
  ]
})
export class LocationsModule {}
