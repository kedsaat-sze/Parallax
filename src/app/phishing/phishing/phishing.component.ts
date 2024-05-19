import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globalVariables } from "../../common/global_variables";
import { ActivatedRoute, Router } from "@angular/router";
import { AnimationPlayer, handleData } from "../../common/create-animation.function";
import { setLocalStorage } from "../../common/set-local-storage.function";

@Component({
  selector: 'app-phishing',
  templateUrl: './phishing.component.html',
  styleUrls: ['./phishing.component.scss']
})
export class PhishingComponent implements OnInit {
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
    this.audio = document.getElementById('my-phishing-audio') as HTMLAudioElement;
    this.audio.src = `${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}phishing/audio/phishing${localStorage.getItem("name") ? "-" + localStorage.getItem("name") : ""}.mp3`;
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
    this.audio!.src = `${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}phishing/audio/phishing.mp3`;
      }, false);
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
      this.audio!.src = `${globalVariables.bucketUrlPrefix}phishing/audio/phishing.mp3`;
      }, false);
    this.http.get<any>(`${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}phishing/phishing.json`)
    .subscribe({
      next: (data) => {handleData(data)},
      error: err => {
        this.http.get<any>(`${globalVariables.bucketUrlPrefix}phishing/phishing.json`)
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
    this.audio = document.getElementById("my-phishing-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }
}
