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
import {Profile} from './infrastructure/auth/profile/profile';
import {AuthGuard} from './infrastructure/auth/auth-guard';

const routes: Routes = [

  {component: LoginComponent, path: "login"},
  {component: Register, path: "register"},
  {
    component: RegistrationRequests,
    path: "registrationrequests",
    canActivate: [AuthGuard],
    data: {role: ['ADMINISTRATOR']}
  },
  {component: Locations, path: "locations", canActivate: [AuthGuard], data: {role: ['ROLE_ADMINISTRATOR']}},
  {component: AddLocation, path: "addlocation", canActivate: [AuthGuard], data: {role: ['ROLE_ADMINISTRATOR']}},
  {component: EditLocation, path: "editlocation/:id", canActivate: [AuthGuard], data: {role: ['ROLE_ADMINISTRATOR']}},
  {component: EditEvent, path: "editevent/:id", canActivate: [AuthGuard], data: {role: ['ROLE_ADMINISTRATOR']}},
  {component: Events, path: "events", canActivate: [AuthGuard], data: {role: ['ROLE_ADMINISTRATOR']}},
  {component: AddEvent, path: "addevent", canActivate: [AuthGuard], data: {role: ['ROLE_ADMINISTRATOR']}},
  {component: Profile, path: "profile", canActivate: [AuthGuard], data: {role: ['ROLE_ADMINISTRATOR']}},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
