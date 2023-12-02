import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { globalVariables } from "../../common/global_variables";
import { handleData } from "../../common/create-animation.function";
import { setLocalStorage } from "src/app/common/set-local-storage.function";

@Component({
  selector: 'app-mobile-device-security',
  templateUrl: './mobile-device-security.component.html',
  styleUrls: ['./mobile-device-security.component.scss']
})
export class MobileDeviceSecurityComponent implements OnInit {
  name: string = "";
  animationPlayers: {animationPlayer: Animation, elementId: string}[] = [];
  audioSrc: string = "";
  audio: HTMLAudioElement | undefined;
  client = globalVariables.client;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.client = params['client']|| "";
      this.name = params['name'] || "";
    });
    setLocalStorage(this.client, this.name);
    globalVariables.germanPage = false;
  }

  async ngOnInit(): Promise<void> {
    this.route.queryParams
    .subscribe(params => {
      this.client = params["client"] || "";
      this.name = params["name"] || "";
    });
    this.audio = document.getElementById('my-audio') as HTMLAudioElement;
    this.audio.src = `https://storage.googleapis.com/sbox-parallax/${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/audio/mobile_device_security${localStorage.getItem("name") ? "-" + localStorage.getItem("name") : ""}.mp3`;
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
    this.audio!.src = `https://storage.googleapis.com/sbox-parallax/${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/audio/mobile_device_security.mp3`;
      }, false);
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
      this.audio!.src = `https://storage.googleapis.com/sbox-parallax/mobile_device_security/audio/mobile_device_security.mp3`;
      }, false);
    this.http.get<any>(`https://storage.googleapis.com/sbox-parallax/${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/mobile_device_security.json`)
    .subscribe({
      next: (data) => {this.animationPlayers = handleData(data, true)},
      error: err => {
        this.http.get<any>(`https://storage.googleapis.com/sbox-parallax/mobile_device_security/mobile_device_security.json`)
        .subscribe({
          next: (data) => {this.animationPlayers = handleData(data, true)},
          error: error => {
            this.router.navigate(['/page-not-found']);
          }
        });
      }
    });
  }

  changeUrl() {
    this.audioSrc = `https://storage.googleapis.com/sbox-parallax/mobile_device_security/audio/mobile-device-security.mp3`;
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
    this.router.navigate([`/mobile_device_security-german${this.client ? "/" + this.client : ""}${this.name ? "/" + this.name : ""}`]);
    event.stopPropagation();
  }

  rateChange() {
    this.audio = document.getElementById("my-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }

}
