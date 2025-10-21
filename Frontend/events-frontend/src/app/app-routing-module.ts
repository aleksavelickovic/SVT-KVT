import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './infrastructure/auth/login/login.component';
import {Register} from './infrastructure/auth/register/register';
import {RegistrationRequests} from './registration-requests/registration-requests';

const routes: Routes = [
  {component: LoginComponent, path: "login"},
  {component: Register, path: "register"},
  {component: RegistrationRequests, path: "registrationrequests"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
