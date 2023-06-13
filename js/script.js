// Global variables
const animationPlayers = [];
const audio = document.getElementById("my-audio");

// Generate html images and animations
function createImage(scene, id, resource, transform, fromTime, animationTime){
    //create image with id and resource
    var imageTag = document.createDocumentFragment();
    imageTag = `<img id=\"${scene}-${id}\" class=\"animated-image\" src=\"${resource}\" width=\"1200\" height=\"675\" alt=\"${id}\" />`;
    var container = document.getElementById("container");
    //add image to container
    container.insertAdjacentHTML('beforeend',imageTag);
    //animation options
    const animationOptions = {
        duration: animationTime*1000,
        fill: "both",
        easing: "linear",
        delay: fromTime*1000
    };
    // transformations
    const transformation = [];
    transform.forEach((item) => {
        //const transform = `${item.transform}`;
        if (item.transform.length > 0) {
          transformation.push({
            transform: item.transform,
            scale: item.scale,
            translate: `${item.position.x}px ${item.position.y}px`,
            opacity: item.opacity,
            offset: item.percent === 0 ? 0 : item.percent/100
          });
        } else {
          transformation.push({
            scale: item.scale,
            opacity: item.opacity,
            translate: `${item.position.x}px ${item.position.y}px`,
            offset: item.percent === 0 ? 0 : item.percent/100
          });
        }
        
    });
    //add animations to images
    const animation = new KeyframeEffect(document.getElementById(`${scene}-${id}`),transformation, animationOptions);
    const animationPlayer = new Animation(animation);
    animationPlayer.play();
    animationPlayers.push({animationPlayer: animationPlayer, elementId: `${scene}-${id}`});
    return;
}

// load json file
fetch("../json/input.json")
.then((res) => res.json())
.then((data) => {
    data.movie.forEach((movie) => { 
        movie.description.background != null ? createImage(movie.name, "background", movie.description.background.resource, movie.description.background.transform, movie.from_time, movie.animation_time) : console.log(`${movie.name}'s background is null`);
        movie.description.screen != null ? createImage(movie.name, "screen", movie.description.screen.resource, movie.description.screen.transform, movie.from_time, movie.animation_time) : console.log(`${movie.name}'s screen is null`);
        movie.description.midground != null ? createImage(movie.name, "midground", movie.description.midground.resource, movie.description.midground.transform, movie.from_time, movie.animation_time) : console.log(`${movie.name}'s midground is null`);
        movie.description.foreground != null ? createImage(movie.name, "foreground", movie.description.foreground.resource, movie.description.foreground.transform, movie.from_time, movie.animation_time) : console.log(`${movie.name}'s foreground is null`);
    });
})
.catch((error) => {
    console.error("Error: Cannot load the input json file");
    console.error(`Error message: ${error}`);
  });

// Play/pause the animations and set the audio's current time to animations
function animateFunc() {
    const images = document.querySelectorAll(".animated-image");
    images.forEach(image => {
        const animations = image.getAnimations();
        animations.forEach(animation => {
            audio.paused ? animation.pause() : animation.play();
            animation.currentTime = audio.currentTime*1000;
        });
    });
}

function animateFuncc() {
  audio.paused ? audio.play() : audio.pause();
  const images = document.querySelectorAll(".animated-image");
  images.forEach(image => {
      const animations = image.getAnimations();
      animations.forEach(animation => {
          audio.paused ? animation.pause() : animation.play();
          animation.currentTime = audio.currentTime*1000;
      });
  });
}