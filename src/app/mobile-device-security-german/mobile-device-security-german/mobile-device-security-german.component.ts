import { HttpClient } from "@angular/common/http";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { globalVariables } from "../../common/global_variables";

@Component({
  selector: 'app-mobile-device-security-german',
  templateUrl: './mobile-device-security-german.component.html',
  styleUrls: ['./mobile-device-security-german.component.scss']
})
export class MobileDeviceSecurityGermanComponent {
  name: string = "";
  animationPlayers: {animationPlayer: Animation, elementId: string}[] = [];
  audioSrc: string = "";
  audio: HTMLAudioElement | undefined;


  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.name = this.route.snapshot.paramMap.get("name") || "";
    if (this.name !== "") {
      localStorage.setItem("name", this.name);
    }
  }

  async ngOnInit(): Promise<void> {
    this.audio = document.getElementById('my-audio') as HTMLAudioElement;
    this.audio.src = `https://storage.googleapis.com/sbox-parallax/mobile_device_security/audio/mobile-device-security-german${localStorage.getItem("name") ? "-" + localStorage.getItem("name") : ""}.mp3`;
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
      this.audio!.src = `https://storage.googleapis.com/sbox-parallax/mobile_device_security/audio/mobile-device-security-german.mp3`;
      }, false);
    this.http.get<any>('./assets/json/mobile_device_security-german.json').subscribe((data) => {
      data.movie.forEach((movie: { description: { background: { resource: any; transform: any; } | null; screen: { resource: any; transform: any; } | null; midground: { resource: any; transform: any; } | null; foreground: { resource: any; transform: any; } | null; }; name: any; from_time: any; animation_time: any; }) => {
        movie.description.background != null ? this.createImage(movie.name, "background", movie.description.background.resource, movie.description.background.transform, movie.from_time, movie.animation_time) : console.log(`${movie.name}'s background is null`);
        let screenResource = "";
        if (movie.description.screen !== null) {
          let position = movie.description.screen.resource.indexOf(".png");
          screenResource = movie.description.screen.resource.substring(0, position) + `_${globalVariables.usedOs === "mac" ? globalVariables.usedOs : "windows"}` + movie.description.screen.resource.substring(position);
        }
        movie.description.screen != null ? this.createImage(movie.name, "screen", screenResource, movie.description.screen.transform, movie.from_time, movie.animation_time) : console.log(`${movie.name}'s screen is null`);
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

  playOnDiv(flag?: boolean) {
    if (!flag) {
      this.audio!.paused ? this.audio!.play() : this.audio!.pause();
    } else {
      this.router.navigate([`/mobile_device_security${this.name ? "/" + this.name : ""}`]);
    }
  }

  rateChange() {
    this.audio = document.getElementById("my-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }
}
