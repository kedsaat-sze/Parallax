import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { AngularDeviceInformationService } from 'angular-device-information';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    MatCardModule
  ],
  providers: [AngularDeviceInformationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
