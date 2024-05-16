import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transformator',
  templateUrl: './transformator.component.html',
  styleUrls: ['./transformator.component.scss']
})
export class TransformatorComponent implements OnInit {
  rotateX = 0;
  rotateY = 0;
  rotateZ = 0;
  scaleX = 1;
  scaleY = 1;
  scaleZ = 1;
  translateX = 0;
  translateY = 0;
  skewX = 0;
  skewY = 0;

  backgroundElement: HTMLImageElement | null = document.getElementById("background") as HTMLImageElement;
  pistaElement: HTMLImageElement | null = document.getElementById("pista") as HTMLImageElement;
  transformValue: string = "-";

  constructor() { }

  ngOnInit(): void {
    this.setDefaultValue();
    this.pistaElement = document.getElementById("pista") as HTMLImageElement;
    this.backgroundElement = document.getElementById("background") as HTMLImageElement;
  }

  selectPista(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pistaElement!.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  selectBackground(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.backgroundElement!.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  setDefaultValue() {
    // Az input mezők értékeinek beállítása a kezdőértékekre
    this.rotateX = 0;
    this.rotateY = 0;
    this.rotateZ = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.scaleZ = 1;
    this.translateX = 0;
    this.translateY = 0;
    this.skewX = 0;
    this.skewY = 0;
  }

  transformGenerate() {
    // A transform tulajdonság értékének generálása
    this.pistaElement!.style.transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg) scaleX(${this.scaleX}) scaleY(${this.scaleY}) scaleZ(${this.scaleZ}) translateX(${this.translateX}%) translateY(${this.translateY}%) skewX(${this.skewX}deg) skewY(${this.skewY}deg)`;
      this.transformValue = `transform: ${this.pistaElement!.style.transform}`;
  }
}
