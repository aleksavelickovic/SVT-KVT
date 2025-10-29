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
import {Profile} from './infrastructure/auth/profile/profile';
import {AuthGuard} from './infrastructure/auth/auth-guard';
import {Home} from './home/home/home';
import {Setup} from './infrastructure/auth/setup/setup';

const routes: Routes = [

  {component: LoginComponent, path: "login"},
  {component: Register, path: "register"},
  {component: Setup, path: "setup"},
  {
    component: RegistrationRequests,
    path: "registrationrequests",
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMINISTRATOR']}
  },
  {
    component: Home,
    path: "home",
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMINISTRATOR', 'ROLE_USER']}
  },

  {
    component: Locations,
    path: "locations",
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMINISTRATOR', 'ROLE_USER']}
  },
  {
    component: AddLocation,
    path: "addlocation",
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMINISTRATOR']}
  },
  {
    component: EditLocation,
    path: "editlocation/:id",
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMINISTRATOR', 'ROLE_USER']}
  },
  {
    component: EditEvent,
    path: "editevent/:id",
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMINISTRATOR']}
  },
  {
    component: Events,
    path: "events",
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMINISTRATOR', 'ROLE_USER']}
  },
  {
    component: AddEvent,
    path: "addevent",
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMINISTRATOR']}
  },
  {
    component: Profile,
    path: "profile",
    canActivate: [AuthGuard],
    data: {role: ['ROLE_ADMINISTRATOR', 'ROLE_USER']}
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
