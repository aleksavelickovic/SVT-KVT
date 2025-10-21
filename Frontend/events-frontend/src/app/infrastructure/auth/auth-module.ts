import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {MaterialModule} from '../../material/material-module';
import {RouterLink} from '@angular/router';
import { Register } from './register/register';


@NgModule({
  declarations: [
    LoginComponent,
    Register
  ],
  exports: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink
  ]
})
export class AuthModule {
}
