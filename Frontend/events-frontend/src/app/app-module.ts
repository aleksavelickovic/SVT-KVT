import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AuthModule } from './infrastructure/auth/auth-module';
import { LayoutModule } from './layout/layout-module';
import { RegistrationRequests } from './registration-requests/registration-requests';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { Interceptor } from './infrastructure/auth/interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material-module';
import {LocationsModule} from './locations/locations-module'; // keep if you have a central material module

@NgModule({
  declarations: [
    App,
    RegistrationRequests
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    LocationsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule {}
