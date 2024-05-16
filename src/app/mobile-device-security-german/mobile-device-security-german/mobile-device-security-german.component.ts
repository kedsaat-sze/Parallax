import { HttpClient } from "@angular/common/http";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { globalVariables } from "../../common/global_variables";
import { AnimationPlayer, handleData } from "../../common/create-animation.function";
import { setLocalStorage } from "../../common/set-local-storage.function";

@Component({
  selector: 'app-mobile-device-security-german',
  templateUrl: './mobile-device-security-german.component.html',
  styleUrls: ['./mobile-device-security-german.component.scss']
})
export class MobileDeviceSecurityGermanComponent {
  name: string = "";
  animationPlayers: AnimationPlayer[] = [];
  audioSrc: string = "";
  audio: HTMLAudioElement | undefined;
  client = "";

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.client = params['client']|| "";
      this.name = params['name'] || "";
    });
    setLocalStorage(this.client, this.name);
    globalVariables.germanPage = true;
  }

  async ngOnInit(): Promise<void> {
    this.audio = document.getElementById('my-audio') as HTMLAudioElement;
    this.audio.src = `${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/audio/mobile-device-security-german${localStorage.getItem("name") ? "-" + localStorage.getItem("name") : ""}.mp3`;
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
    this.audio!.src = `${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/audio/mobile-device-security-german.mp3`;
      }, false);
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
      this.audio!.src = `${globalVariables.bucketUrlPrefix}mobile_device_security/audio/mobile-device-security-german.mp3`;
      }, false);
    this.http.get<any>(`${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/mobile_device_security-german.json`)
    .subscribe({
      next: (data) => {this.animationPlayers = handleData(data, true)},
      error: err => {
        this.http.get<any>(`${globalVariables.bucketUrlPrefix}mobile_device_security/mobile_device_security-german.json`)
        .subscribe({
          next: (data) => {this.animationPlayers = handleData(data, true)},
          error: error => {
            this.router.navigate(['/page-not-found']);
          }
        });
      }
    });
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

  changeLanguage(event: Event) {
    this.router.navigate([`/mobile_device_security${this.client ? "/" + this.client : ""}${this.name ? "/" + this.name : ""}`]);
    event.stopPropagation();
  }

  rateChange() {
    this.audio = document.getElementById("my-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }
}
