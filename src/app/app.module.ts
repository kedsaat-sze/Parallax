import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { AngularDeviceInformationService } from 'angular-device-information';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    SocialLoginModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AngularDeviceInformationService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1054563153627-p70gvc8kbfchva3gcm2jb5kjfpkkov70.apps.googleusercontent.com',
              {
                scopes: "https://www.googleapis.com/auth/devstorage.full_control"
              }
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
