import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileDeviceSecurityComponent } from "./mobile-device-security/mobile-device-security.component";

const routes: Routes = [
  {
    path: '',
    component: MobileDeviceSecurityComponent
  },
  {
    path: ':name',
    component: MobileDeviceSecurityComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileDeviceSecurityRoutingModule { }
