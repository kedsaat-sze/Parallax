import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'transformator', loadChildren: () => import('./transformator/transformator.module').then(m => m.TransformatorModule) },
  { path: 'phishing', loadChildren: () => import('./phishing/phishing.module').then(m => m.PhishingModule) },
  { path: 'password_security', loadChildren: () => import('./password-security/password-security.module').then(m => m.PasswordSecurityModule) },
  { path: 'mobile_device_security', loadChildren: () => import('./mobile-device-security/mobile-device-security.module').then(m => m.MobileDeviceSecurityModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
