import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './infrastructure/auth/login/login.component';
import {Register} from './infrastructure/auth/register/register';

const routes: Routes = [
  {component: LoginComponent, path: "login"},
  {component: Register, path: "register"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
