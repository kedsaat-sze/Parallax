import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordSecurityComponent } from "./password-security/password-security.component";

const routes: Routes = [
  {
    path: '',
    component: PasswordSecurityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordSecurityRoutingModule { }
