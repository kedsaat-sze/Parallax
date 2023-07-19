import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordAndAuthenticationComponent } from "./password-and-authentication/password-and-authentication.component";

const routes: Routes = [
  {
    path: '',
    component: PasswordAndAuthenticationComponent
  },
  {
    path: ':name',
    component: PasswordAndAuthenticationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordAndAuthenticationRoutingModule { }
