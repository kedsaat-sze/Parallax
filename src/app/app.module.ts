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
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './common/components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingModule } from "angular-star-rating";
import { SharedVideosComponent } from "./shared-videos/shared-videos.component";
import { initializeApp  } from "firebase/app";
import { firebaseConfig } from "src/environments/environment";
import { getAuth, connectAuthEmulator, provideAuth } from "@angular/fire/auth";
import { provideFirebaseApp } from "@angular/fire/app";
import { getFirestore, connectFirestoreEmulator, provideFirestore } from "@angular/fire/firestore";
import { getStorage, connectStorageEmulator, provideStorage } from "@angular/fire/storage";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { AuthGuard } from "@angular/fire/auth-guard";
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    DialogComponent,
    SharedVideosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    StarRatingModule.forRoot(),
    provideFirebaseApp(() =>  initializeApp(firebaseConfig)),
    provideAuth(() => {
      const  auth = getAuth();
      if (location.hostname === 'localhost') {
              connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings:  true });
      }
      return  auth;
    }),
    provideFirestore(() => {
      const  firestore = getFirestore();
      if (location.hostname === 'localhost') {
              connectFirestoreEmulator(firestore, '127.0.0.1', 8080);
      }
      return  firestore;
    }),
    provideStorage(() => {
      const  storage = getStorage();
      if (location.hostname === 'localhost') {
              connectStorageEmulator(storage, '127.0.0.1', 5001);
      }
      return  storage;
    }),
  ],
  providers: [
    AngularDeviceInformationService,
    //AuthGuard, { provide: FIREBASE_OPTIONS, useValue: firebaseConfig }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
