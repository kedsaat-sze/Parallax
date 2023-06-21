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

  /*sselectPista() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", function() {
    const file = this.files![0];
    const reader = new FileReader();
    reader.addEventListener("load", function() {
      this.backgroundImg.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
  input.click();
}

pistaBtn.addEventListener("click", function() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", function() {
    const file = this.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function() {
      pistaImage.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
  input.click();
});*/

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
  console.log("transformGenerate");
  this.pistaElement!.style.transform = `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg) scaleX(${this.scaleX}) scaleY(${this.scaleY}) scaleZ(${this.scaleZ}) translateX(${this.translateX}%) translateY(${this.translateY}%) skewX(${this.skewX}deg) skewY(${this.skewY}deg)`;
    this.transformValue = `transform: ${this.pistaElement!.style.transform}`;
}
/*
// Az input mezők és slider-ek eseménykezelői
this.rotateX.addEventListener('input', function() {
    rotateXSlider.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXInput.value}deg) rotateY(${rotateYInput.value}deg) rotateZ(${rotateZInput.value}deg) scaleX(${scaleXInput.value}) scaleY(${scaleYInput.value}) scaleZ(${scaleZInput.value}) translateX(${translateXInput.value}%) translateY(${translateYInput.value}%) skewX(${skewXInput.value}deg) skewY(${skewYInput.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

rotateYInput.addEventListener('input', function() {
    rotateYSlider.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXInput.value}deg) rotateY(${rotateYInput.value}deg) rotateZ(${rotateZInput.value}deg) scaleX(${scaleXInput.value}) scaleY(${scaleYInput.value}) scaleZ(${scaleZInput.value}) translateX(${translateXInput.value}%) translateY(${translateYInput.value}%) skewX(${skewXInput.value}deg) skewY(${skewYInput.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

rotateZInput.addEventListener('input', function() {
    rotateZSlider.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXInput.value}deg) rotateY(${rotateYInput.value}deg) rotateZ(${rotateZInput.value}deg) scaleX(${scaleXInput.value}) scaleY(${scaleYInput.value}) scaleZ(${scaleZInput.value}) translateX(${translateXInput.value}%) translateY(${translateYInput.value}%) skewX(${skewXInput.value}deg) skewY(${skewYInput.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

sscaleXInput.addEventListener('input', () => {
  this.scaleXValue = Number(scaleXInput.value);
  pistaImage.style.transform = `rotateX(${this.rotateXValue}deg) rotateY(${this.rotateYValue}deg) rotateZ(${this.rotateZValue}deg) scaleX(${this.scaleXValue}) scaleY(${this.scaleYValue}) scaleZ(${this.scaleZValue}) translateX(${this.translateXValue}%) translateY(${this.translateYValue}%) skewX(${this.skewXValue}deg) skewY(${this.skewYValue}deg)`;
  transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

// Event listener for scaleY input
scaleYInput.addEventListener('input', function() {
    scaleYSlider.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXInput.value}deg) rotateY(${rotateYInput.value}deg) rotateZ(${rotateZInput.value}deg) scaleX(${scaleXInput.value}) scaleY(${scaleYInput.value}) scaleZ(${scaleZInput.value}) translateX(${translateXInput.value}%) translateY(${translateYInput.value}%) skewX(${skewXInput.value}deg) skewY(${skewYInput.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

// Event listener for scaleZ input
scaleZInput.addEventListener('input', function() {
    scaleZSlider.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXInput.value}deg) rotateY(${rotateYInput.value}deg) rotateZ(${rotateZInput.value}deg) scaleX(${scaleXInput.value}) scaleY(${scaleYInput.value}) scaleZ(${scaleZInput.value}) translateX(${translateXInput.value}%) translateY(${translateYInput.value}%) skewX(${skewXInput.value}deg) skewY(${skewYInput.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

// Event listener for translateX input
translateXInput.addEventListener('input', function() {
    translateXSlider.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXInput.value}deg) rotateY(${rotateYInput.value}deg) rotateZ(${rotateZInput.value}deg) scaleX(${scaleXInput.value}) scaleY(${scaleYInput.value}) scaleZ(${scaleZInput.value}) translateX(${translateXInput.value}%) translateY(${translateYInput.value}%) skewX(${skewXInput.value}deg) skewY(${skewYInput.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

// Event listener for translateY input
translateYInput.addEventListener('input', function() {
    translateYSlider.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXInput.value}deg) rotateY(${rotateYInput.value}deg) rotateZ(${rotateZInput.value}deg) scaleX(${scaleXInput.value}) scaleY(${scaleYInput.value}) scaleZ(${scaleZInput.value}) translateX(${translateXInput.value}%) translateY(${translateYInput.value}%) skewX(${skewXInput.value}deg) skewY(${skewYInput.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

// Event listener for skewX input
skewXInput.addEventListener('input', function() {
    skewXSlider.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXInput.value}deg) rotateY(${rotateYInput.value}deg) rotateZ(${rotateZInput.value}deg) scaleX(${scaleXInput.value}) scaleY(${scaleYInput.value}) scaleZ(${scaleZInput.value}) translateX(${translateXInput.value}%) translateY(${translateYInput.value}%) skewX(${skewXInput.value}deg) skewY(${skewYInput.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

skewYInput.addEventListener('input', function() {
    skewYSlider.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXInput.value}deg) rotateY(${rotateYInput.value}deg) rotateZ(${rotateZInput.value}deg) scaleX(${scaleXInput.value}) scaleY(${scaleYInput.value}) scaleZ(${scaleZInput.value}) translateX(${translateXInput.value}%) translateY(${translateYInput.value}%) skewX(${skewXInput.value}deg) skewY(${skewYInput.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

rotateXSlider.addEventListener('input', function() {
    rotateXInput.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXSlider.value}deg) rotateY(${rotateYSlider.value}deg) rotateZ(${rotateZSlider.value}deg) scaleX(${scaleXSlider.value}) scaleY(${scaleYSlider.value}) scaleZ(${scaleZSlider.value}) translateX(${translateXSlider.value}%) translateY(${translateYSlider.value}%) skewX(${skewXSlider.value}deg) skewY(${skewYSlider.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

rotateYSlider.addEventListener('input', function() {
    rotateYInput.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXSlider.value}deg) rotateY(${rotateYSlider.value}deg) rotateZ(${rotateZSlider.value}deg) scaleX(${scaleXSlider.value}) scaleY(${scaleYSlider.value}) scaleZ(${scaleZSlider.value}) translateX(${translateXSlider.value}%) translateY(${translateYSlider.value}%) skewX(${skewXSlider.value}deg) skewY(${skewYSlider.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

rotateZSlider.addEventListener('input', function() {
    rotateZInput.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXSlider.value}deg) rotateY(${rotateYSlider.value}deg) rotateZ(${rotateZSlider.value}deg) scaleX(${scaleXSlider.value}) scaleY(${scaleYSlider.value}) scaleZ(${scaleZSlider.value}) translateX(${translateXSlider.value}%) translateY(${translateYSlider.value}%) skewX(${skewXSlider.value}deg) skewY(${skewYSlider.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

scaleXSlider.addEventListener('input', function() {
    scaleXInput.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXSlider.value}deg) rotateY(${rotateYSlider.value}deg) rotateZ(${rotateZSlider.value}deg) scaleX(${scaleXSlider.value}) scaleY(${scaleYSlider.value}) scaleZ(${scaleZSlider.value}) translateX(${translateXSlider.value}%) translateY(${translateYSlider.value}%) skewX(${skewXSlider.value}deg) skewY(${skewYSlider.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

scaleYSlider.addEventListener('input', function() {
    scaleYInput.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXSlider.value}deg) rotateY(${rotateYSlider.value}deg) rotateZ(${rotateZSlider.value}deg) scaleX(${scaleXSlider.value}) scaleY(${scaleYSlider.value}) scaleZ(${scaleZSlider.value}) translateX(${translateXSlider.value}%) translateY(${translateYSlider.value}%) skewX(${skewXSlider.value}deg) skewY(${skewYSlider.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

scaleZSlider.addEventListener('input', function() {
    scaleZInput.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXSlider.value}deg) rotateY(${rotateYSlider.value}deg) rotateZ(${rotateZSlider.value}deg) scaleX(${scaleXSlider.value}) scaleY(${scaleYSlider.value}) scaleZ(${scaleZSlider.value}) translateX(${translateXSlider.value}%) translateY(${translateYSlider.value}%) skewX(${skewXSlider.value}deg) skewY(${skewYSlider.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

translateXSlider.addEventListener('input', function() {
    translateXInput.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXSlider.value}deg) rotateY(${rotateYSlider.value}deg) rotateZ(${rotateZSlider.value}deg) scaleX(${scaleXSlider.value}) scaleY(${scaleYSlider.value}) scaleZ(${scaleZSlider.value}) translateX(${translateXSlider.value}%) translateY(${translateYSlider.value}%) skewX(${skewXSlider.value}deg) skewY(${skewYSlider.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

translateYSlider.addEventListener('input', function() {
    translateYInput.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXSlider.value}deg) rotateY(${rotateYSlider.value}deg) rotateZ(${rotateZSlider.value}deg) scaleX(${scaleXSlider.value}) scaleY(${scaleYSlider.value}) scaleZ(${scaleZSlider.value}) translateX(${translateXSlider.value}%) translateY(${translateYSlider.value}%) skewX(${skewXSlider.value}deg) skewY(${skewYSlider.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

skewXSlider.addEventListener('input', function() {
    skewXInput.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXSlider.value}deg) rotateY(${rotateYSlider.value}deg) rotateZ(${rotateZSlider.value}deg) scaleX(${scaleXSlider.value}) scaleY(${scaleYSlider.value}) scaleZ(${scaleZSlider.value}) translateX(${translateXSlider.value}%) translateY(${translateYSlider.value}%) skewX(${skewXSlider.value}deg) skewY(${skewYSlider.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});

skewYSlider.addEventListener('input', function() {
    skewYInput.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXSlider.value}deg) rotateY(${rotateYSlider.value}deg) rotateZ(${rotateZSlider.value}deg) scaleX(${scaleXSlider.value}) scaleY(${scaleYSlider.value}) scaleZ(${scaleZSlider.value}) translateX(${translateXSlider.value}%) translateY(${translateYSlider.value}%) skewX(${skewXSlider.value}deg) skewY(${skewYSlider.value}deg)`;
    transformValue.textContent = `transform: ${pistaImage.style.transform}`;
});
*/

}
