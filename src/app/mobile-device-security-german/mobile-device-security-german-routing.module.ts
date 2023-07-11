import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileDeviceSecurityGermanComponent } from "./mobile-device-security-german/mobile-device-security-german.component";

const routes: Routes = [
  {
    path: '',
    component: MobileDeviceSecurityGermanComponent
  },
  {
    path: ':name',
    component: MobileDeviceSecurityGermanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileDeviceSecurityGermanRoutingModule { }
