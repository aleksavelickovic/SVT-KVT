import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBar} from './nav-bar/nav-bar';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';


@NgModule({
  declarations: [
    NavBar,
  ],
  exports: [
    NavBar
  ],
  imports: [
    CommonModule,
    MatToolbar,
    MatButton
  ]
})
export class LayoutModule {
}
