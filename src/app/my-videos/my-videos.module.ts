import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MyVideosComponent } from './my-videos/my-videos.component';
import { MyVideosRoutingModule } from "./my-videos-routing.module";
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from "@angular/common/http";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { MonacoEditorModule } from "ngx-monaco-editor-v2";

@NgModule({
  declarations: [
    MyVideosComponent
  ],
  imports: [
    CommonModule,
    MyVideosRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MonacoEditorModule.forRoot(),
  ]
})
export class MyVideosModule {
  constructor() {}
}
