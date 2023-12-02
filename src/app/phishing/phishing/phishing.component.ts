import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globalVariables } from "src/app/common/global_variables";
import { ActivatedRoute, Router } from "@angular/router";
import { handleData } from "../../common/create-animation.function";

@Component({
  selector: 'app-phishing',
  templateUrl: './phishing.component.html',
  styleUrls: ['./phishing.component.scss']
})
export class PhishingComponent implements OnInit {
  name: string = "";
  animationPlayers: {animationPlayer: Animation, elementId: string}[] = [];
  audio: HTMLAudioElement | undefined;
  client = globalVariables.client;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.name = this.route.snapshot.paramMap.get("name") || "";
    this.client = this.route.snapshot.paramMap.get('client') || "";
    if (this.name !== "") {
      localStorage.setItem("name", this.name);
    }
    if (this.client !== "") {
      localStorage.setItem("client", this.client);
    }
  }


  ngOnInit(): void {
    this.audio = document.getElementById('my-audio') as HTMLAudioElement;
    this.audio.src = `https://storage.googleapis.com/sbox-parallax/${localStorage.getItem("client") ? "-" + localStorage.getItem("client") : ""}phishing/audio/phishing${localStorage.getItem("name") ? "-" + localStorage.getItem("name") : ""}.mp3`;
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
    this.audio!.src = `https://storage.googleapis.com/sbox-parallax/${localStorage.getItem("client") ? "-" + localStorage.getItem("client") : ""}phishing/audio/phishing.mp3`;
      }, false);
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
      this.audio!.src = `https://storage.googleapis.com/sbox-parallax/phishing/audio/phishing.mp3`;
      }, false);
    this.http.get<any>(`https://storage.googleapis.com/sbox-parallax/${localStorage.getItem("client") ? "-" + localStorage.getItem("client") : ""}phishing/phishing.json`)
    .subscribe({
      next: (data) => {this.animationPlayers = handleData(data)},
      error: err => {
        this.http.get<any>(`https://storage.googleapis.com/sbox-parallax/phishing/phishing.json`)
        .subscribe({
          next: (data) => {this.animationPlayers = handleData(data)},
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
    this.audio = document.getElementById("my-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }
}
