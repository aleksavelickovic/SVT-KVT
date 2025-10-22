import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Events} from './events/events';
import {MatButton} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {RouterLink} from '@angular/router';


@NgModule({
  declarations: [
    Events
  ],
  imports: [
    CommonModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    RouterLink
  ]
})
export class EventsModule {
}
