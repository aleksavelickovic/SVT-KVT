import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Locations} from './locations/locations';
import {AddLocation} from './add-location/add-location';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// ✅ Import *modules*, not components
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MaterialModule} from '../material/material-module';
import {EditLocation} from './edit-location/edit-location'; // optional if you aggregate them here

@NgModule({
  declarations: [
    Locations,
    AddLocation,
    EditLocation
  ],
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,         // keep if you have it, else remove
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class LocationsModule {}
