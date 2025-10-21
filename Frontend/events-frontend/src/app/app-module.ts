import {NgModule, provideBrowserGlobalErrorListeners} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing-module';
import {App} from './app';
import {AuthModule} from "./infrastructure/auth/auth-module";
import {provideHttpClient, withFetch, withInterceptorsFromDi} from '@angular/common/http';
import {LayoutModule} from './layout/layout-module';
import {RegistrationRequests} from './registration-requests/registration-requests';

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
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ],
  bootstrap: [App]
})
export class AppModule { }
