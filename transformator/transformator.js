const backgroundBtn = document.getElementById("backgroundBtn");
const pistaBtn = document.getElementById("pistaBtn");
const backgroundImg = document.getElementById("background");
const pistaImage = document.getElementById("pista");

backgroundBtn.addEventListener("click", function() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.addEventListener("change", function() {
    const file = this.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function() {
      backgroundImg.src = reader.result;
    });
    reader.readAsDataURL(file);
  });
  input.click();
});

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
});


// Az input mezők és a slider-ek kiválasztása
const rotateXInput = document.querySelector('#rotateXValue');
const rotateYInput = document.querySelector('#rotateYValue');
const rotateZInput = document.querySelector('#rotateZValue');
const scaleXInput = document.querySelector('#scaleXValue');
const scaleYInput = document.querySelector('#scaleYValue');
const scaleZInput = document.querySelector('#scaleZValue');
const translateXInput = document.querySelector('#translateXValue');
const translateYInput = document.querySelector('#translateYValue');
const skewXInput = document.querySelector('#skewXValue');
const skewYInput = document.querySelector('#skewYValue');

const rotateXSlider = document.querySelector('#rotateX');
const rotateYSlider = document.querySelector('#rotateY');
const rotateZSlider = document.querySelector('#rotateZ');
const scaleXSlider = document.querySelector('#scaleX');
const scaleYSlider = document.querySelector('#scaleY');
const scaleZSlider = document.querySelector('#scaleZ');
const translateXSlider = document.querySelector('#translateX');
const translateYSlider = document.querySelector('#translateY');
const skewXSlider = document.querySelector('#skewX');
const skewYSlider = document.querySelector('#skewY');


function setDefaultValue() {
// Az input mezők értékeinek beállítása a kezdőértékekre
rotateXInput.value = 0;
rotateYInput.value = 0;
rotateZInput.value = 0;
scaleXInput.value = 1;
scaleYInput.value = 1;
scaleZInput.value = 1;
translateXInput.value = 0;
translateYInput.value = 0;
skewXInput.value = 0;
skewYInput.value = 0;
rotateXSlider.value = 0;
rotateYSlider.value = 0;
rotateZSlider.value = 0;
scaleXSlider.value = 1;
scaleYSlider.value = 1;
scaleZSlider.value = 1;
translateXSlider.value = 0;
translateYSlider.value = 0;
skewXSlider.value = 0;
skewYSlider.value = 0;
}

setDefaultValue();
// Az input mezők és slider-ek eseménykezelői
rotateXInput.addEventListener('input', function() {
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

// Event listener for scaleX input
scaleXInput.addEventListener('input', function() {
    scaleXSlider.value = this.value;
    pistaImage.style.transform = `rotateX(${rotateXInput.value}deg) rotateY(${rotateYInput.value}deg) rotateZ(${rotateZInput.value}deg) scaleX(${scaleXInput.value}) scaleY(${scaleYInput.value}) scaleZ(${scaleZInput.value}) translateX(${translateXInput.value}%) translateY(${translateYInput.value}%) skewX(${skewXInput.value}deg) skewY(${skewYInput.value}deg)`;
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