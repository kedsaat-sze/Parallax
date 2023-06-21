import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransformatorComponent } from "./transformator/transformator.component";
import { TransformatorRoutingModule } from "./transformator-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    TransformatorComponent
  ],
  imports: [
    CommonModule,
    TransformatorRoutingModule,
    FormsModule
  ]
})
export class TransformatorModule {
  constructor() {}
}
