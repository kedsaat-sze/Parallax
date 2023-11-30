import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globalVariables } from "src/app/common/global_variables";

@Component({
  selector: 'app-phishing',
  templateUrl: './phishing.component.html',
  styleUrls: ['./phishing.component.scss']
})
export class PhishingComponent implements OnInit {
  animationPlayers: {animationPlayer: Animation, elementId: string}[] = [];
  audio: HTMLAudioElement | undefined;

  constructor(private http: HttpClient) {
    console.log(globalVariables.usedOs);
  }

  ngOnInit(): void {
    this.audio = document.getElementById('my-audio') as HTMLAudioElement;
    this.http.get<any>('https://storage.googleapis.com/sbox-parallax/password_and_authentication/password_and_authentication.json').subscribe((data) => {
      data.movie.forEach((movie: { description: { background: { resource: any; transform: any; } | null; screen: { resource: any; transform: any; } | null; midground: { resource: any; transform: any; } | null; foreground: { resource: any; transform: any; } | null; }; name: any; from_time: any; animation_time: any; }) => {
        movie.description.background != null ? this.createImage(movie.name, "background", movie.description.background.resource, movie.description.background.transform, movie.from_time, movie.animation_time) : console.log(`${movie.name}'s background is null`);
        movie.description.screen != null ? this.createImage(movie.name, "screen", movie.description.screen.resource, movie.description.screen.transform, movie.from_time, movie.animation_time) : console.log(`${movie.name}'s screen is null`);
        movie.description.midground != null ? this.createImage(movie.name, "midground", movie.description.midground.resource, movie.description.midground.transform, movie.from_time, movie.animation_time) : console.log(`${movie.name}'s midground is null`);
        movie.description.foreground != null ? this.createImage(movie.name, "foreground", movie.description.foreground.resource, movie.description.foreground.transform, movie.from_time, movie.animation_time) : console.log(`${movie.name}'s foreground is null`);
      });
    });
  }

  createImage(scene: string, id: string, resource: string, transform: {
    percent: number,
    transform: string,
    scale: number,
    rotate: number,
    opacity: number,
    position: {
        x: number,
        y: number
    }
  }[], fromTime: number, animationTime: number){
      let imageTag = `<img id=\"${scene}-${id}\" class=\"animated-image\" src=\"${resource}\" width=\"1200\" height=\"675\" alt=\"${id}\" />`;
      var container = document.getElementById("container");
      container!.insertAdjacentHTML('beforeend',imageTag);
      const animationOptions: KeyframeEffectOptions = {
          duration: animationTime*1000,
          fill: "both",
          easing: "linear",
          delay: fromTime*1000
      };
      let transformation: {
        transform?: string,
        scale: number,
        translate: string,
        opacity: number,
        offset: number
      }[] = [];
      transform.forEach((item) => {
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
      animationPlayer.pause();
      this.animationPlayers.push({animationPlayer: animationPlayer, elementId: `${scene}-${id}`});
      return;
  }

  // Play/pause the animations and set the audio's current time to animations
  animateFunc() {
    const images = document.querySelectorAll(".animated-image");
    images.forEach(image => {
        const animations = image.getAnimations();
        animations.forEach(animation => {
            this.audio!.paused ? animation.pause() : animation.play();
            animation.currentTime = this.audio!.currentTime*1000;
        });
    });
  }

  playOnDiv() {
    this.audio!.paused ? this.audio!.play() : this.audio!.pause();
  }

  rateChange() {
    this.audio = document.getElementById("my-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }
}
