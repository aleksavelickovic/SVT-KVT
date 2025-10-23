import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './infrastructure/auth/login/login.component';
import {Register} from './infrastructure/auth/register/register';
import {RegistrationRequests} from './registration-requests/registration-requests';
import {Locations} from './locations/locations/locations';
import {AddLocation} from './locations/add-location/add-location';
import {EditLocation} from './locations/edit-location/edit-location';
import {Events} from './events/events/events';
import {EditEvent} from './events/edit-event/edit-event';
import {AddEvent} from './events/add-event/add-event';
import {ReviewsModule} from './reviews/reviews-module';

const routes: Routes = [

  {component: LoginComponent, path: "login"},
  {component: Register, path: "register"},
  {component: RegistrationRequests, path: "registrationrequests"},
  {component: Locations, path: "locations"},
  {component: AddLocation, path: "addlocation"},
  {component: EditLocation, path: "editlocation/:id"},
  {component: EditEvent, path: "editevent/:id"},
  {component: Events, path: "events"},
  {component: AddEvent, path: "addevent"}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
