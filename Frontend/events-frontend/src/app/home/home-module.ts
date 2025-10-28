import {NgModule} from '@angular/core';

import {Home} from './home/home';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';

import {ReactiveFormsModule} from '@angular/forms';

import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatLabel} from '@angular/material/form-field';
import {MatFormField, MatInput} from '@angular/material/input';
import {MaterialModule} from '../material/material-module';


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
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class HomeModule { }
