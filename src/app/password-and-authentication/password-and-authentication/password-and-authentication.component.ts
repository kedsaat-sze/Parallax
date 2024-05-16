import { HttpClient } from "@angular/common/http";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { globalVariables } from "../../common/global_variables";
import { AnimationPlayer, handleData } from "../../common/create-animation.function";
import { setLocalStorage } from "../../common/set-local-storage.function";

@Component({
  selector: 'app-password-and-authentication',
  templateUrl: './password-and-authentication.component.html',
  styleUrls: ['./password-and-authentication.component.scss']
})
export class PasswordAndAuthenticationComponent {
  name: string = "";
  animationPlayers: AnimationPlayer[] = [];
  audio: HTMLAudioElement | undefined;
  client = "";

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.client = params['client']|| "";
      this.name = params['name'] || "";
    });
    setLocalStorage(this.client, this.name);
    globalVariables.germanPage = false;
  }

  async ngOnInit(): Promise<void> {
    this.audio = document.getElementById('my-pw-and-auth-audio') as HTMLAudioElement;
    this.audio.src = `${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}password_and_authentication/audio/password_and_authentication${localStorage.getItem("name") ? "-" + localStorage.getItem("name") : ""}.mp3`;
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
    this.audio!.src = `${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}password_and_authentication/audio/password_and_authentication.mp3`;
      }, false);
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
      this.audio!.src = `${globalVariables.bucketUrlPrefix}password_and_authentication/audio/password_and_authentication.mp3`;
      }, false);
    this.http.get<any>(`${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}password_and_authentication/password_and_authentication.json`)
    .subscribe({
      next: (data) => {this.animationPlayers = handleData(data, true)},
      error: err => {
        this.http.get<any>(`${globalVariables.bucketUrlPrefix}password_and_authentication/password_and_authentication.json`)
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

  rateChange() {
    this.audio = document.getElementById("my-pw-and-auth-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }

}
