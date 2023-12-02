import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home/:client', component: HomeComponent },
  { path: 'transformator', loadChildren: () => import('./transformator/transformator.module').then(m => m.TransformatorModule) },
  { path: 'phishing/:client', loadChildren: () => import('./phishing/phishing.module').then(m => m.PhishingModule) },
  { path: 'password_security', loadChildren: () => import('./password-security/password-security.module').then(m => m.PasswordSecurityModule) },
  { path: 'mobile_device_security', loadChildren: () => import('./mobile-device-security/mobile-device-security.module').then(m => m.MobileDeviceSecurityModule) },
  { path: 'mobile_device_security-german', loadChildren: () => import('./mobile-device-security-german/mobile-device-security-german.module').then(m => m.MobileDeviceSecurityGermanModule) },
  { path: 'password_and_authentication', loadChildren: () => import('./password-and-authentication/password-and-authentication.module').then(m => m.PasswordAndAuthenticationModule) },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
