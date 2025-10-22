import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Events} from './events/events';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage, MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {RouterLink, RouterModule} from '@angular/router';
import {EditEvent} from './edit-event/edit-event';
import {MatFormField} from '@angular/material/input';
import {MatInput, MatLabel} from '@angular/material/input';
import {MaterialModule} from '../material/material-module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatOptgroup, MatOption} from "@angular/material/core";
import {MatSelect} from '@angular/material/select';


@NgModule({
  declarations: [
    Events,
    EditEvent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButton,
    MatCard,
    MatCardModule,
    MatButtonModule,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    RouterLink,
    MatFormField,
    MatInput,
    MatLabel,
    MaterialModule,
    ReactiveFormsModule,
    MatCheckbox,
    MatOption,
    MatOptgroup,
    RouterModule,
    MatSelect
  ]
})
export class EventsModule {
}
