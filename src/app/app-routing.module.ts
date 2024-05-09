import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuardService } from "./common/auth-guard.service";
import { SharedVideosComponent } from "./shared-videos/shared-videos.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'sharedvideos', component: SharedVideosComponent },
  { path: 'transformator', loadChildren: () => import('./transformator/transformator.module').then(m => m.TransformatorModule), canActivate: [AuthGuardService] },
  { path: 'phishing', loadChildren: () => import('./phishing/phishing.module').then(m => m.PhishingModule), canActivate: [AuthGuardService] },
  { path: 'password_security', loadChildren: () => import('./password-security/password-security.module').then(m => m.PasswordSecurityModule), canActivate: [AuthGuardService] },
  { path: 'mobile_device_security', loadChildren: () => import('./mobile-device-security/mobile-device-security.module').then(m => m.MobileDeviceSecurityModule), canActivate: [AuthGuardService] },
  { path: 'mobile_device_security-german', loadChildren: () => import('./mobile-device-security-german/mobile-device-security-german.module').then(m => m.MobileDeviceSecurityGermanModule), canActivate: [AuthGuardService] },
  { path: 'my_videos', loadChildren: () => import('./my-videos/my-videos.module').then(m => m.MyVideosModule), canActivate: [AuthGuardService] },
  { path: 'password_and_authentication', loadChildren: () => import('./password-and-authentication/password-and-authentication.module').then(m => m.PasswordAndAuthenticationModule), canActivate: [AuthGuardService] },
  { path: 'page-not-found', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
