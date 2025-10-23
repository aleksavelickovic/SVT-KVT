import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {MaterialModule} from '../../material/material-module';
import {RouterLink} from '@angular/router';
import { Register } from './register/register';
import { Profile } from './profile/profile';


@NgModule({
  declarations: [
    LoginComponent,
    Register,
    Profile
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
