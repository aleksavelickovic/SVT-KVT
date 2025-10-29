import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {MaterialModule} from '../../material/material-module';
import {RouterLink} from '@angular/router';
import {Register} from './register/register';
import {Profile} from './profile/profile';
import {FormsModule} from "@angular/forms";
import {Setup} from './setup/setup';


@NgModule({
  declarations: [
    LoginComponent,
    Register,
    Profile,
    Setup
  ],
  exports: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterLink,
        FormsModule
    ]
})
export class AuthModule {
}
