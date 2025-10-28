import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Home} from './home/home';
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


@NgModule({
  declarations: [
    Home
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
    MatCardTitle
  ]
})
export class HomeModule { }
