import { HttpClient } from "@angular/common/http";
import { Component } from '@angular/core';
import { globalVariables } from "../../common/global_variables";
import { ActivatedRoute, Router } from "@angular/router";
import { AnimationPlayer, handleData } from "../../common/create-animation.function";
import { setLocalStorage } from "../../common/set-local-storage.function";

@Component({
  selector: 'app-password-security',
  templateUrl: './password-security.component.html',
  styleUrls: ['./password-security.component.scss']
})
export class PasswordSecurityComponent {
  name: string = "";
  animationPlayers: AnimationPlayer[] = [];
  audio: HTMLAudioElement | undefined;
  client = "";

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.client = params['client']|| "";
      this.name = params['name'] || "";
    });
    setLocalStorage(this.client, this.name);
  }

  ngOnInit(): void {
    this.audio = document.getElementById('my-pw-security-audio') as HTMLAudioElement;
    this.audio.src = `${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}password_security/audio/password_security${localStorage.getItem("name") ? "-" + localStorage.getItem("name") : ""}.mp3`;
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
    this.audio!.src = `${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}password_security/audio/password_security.mp3`;
      }, false);
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
      this.audio!.src = `${globalVariables.bucketUrlPrefix}password_security/audio/password_security.mp3`;
      }, false);
    this.http.get<any>(`${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}password_security/password_security.json`)
    .subscribe({
      next: (data) => {handleData(data)},
      error: err => {
        this.http.get<any>(`${globalVariables.bucketUrlPrefix}password_security/password_security.json`)
        .subscribe({
          next: (data) => {handleData(data)},
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

  rateChange() {
    this.audio = document.getElementById("my-pw-security-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }
}
