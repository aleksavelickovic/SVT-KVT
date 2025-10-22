import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './infrastructure/auth/login/login.component';
import {Register} from './infrastructure/auth/register/register';
import {RegistrationRequests} from './registration-requests/registration-requests';
import {Locations} from './locations/locations/locations';
import {AddLocation} from './locations/add-location/add-location';
import {EditLocation} from './locations/edit-location/edit-location';

const routes: Routes = [
  {component: LoginComponent, path: "login"},
  {component: Register, path: "register"},
  {component: RegistrationRequests, path: "registrationrequests"},
  {component: Locations, path: "locations"},
  {component: AddLocation, path: "addlocation"},
  {component: EditLocation, path: "editlocation/:id"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
