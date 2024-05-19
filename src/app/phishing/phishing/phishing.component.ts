import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { globalVariables } from "../../common/global_variables";
import { ActivatedRoute, Router } from "@angular/router";
import { handleData } from "../../common/create-animation.function";
import { setLocalStorage } from "../../common/set-local-storage.function";
import { SharedDataService } from "../../../app/common/shared-data.service";

@Component({
  selector: 'app-phishing',
  templateUrl: './phishing.component.html',
  styleUrls: ['./phishing.component.scss']
})
export class PhishingComponent implements OnInit {
  name: string = "";
  audio: HTMLAudioElement | undefined;
  client = "";
  sharedDataService = inject(SharedDataService);

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.client = params['client']|| "";
      this.name = params['name'] || "";
    });
    setLocalStorage(this.client, this.name);
  }


  async ngOnInit(): Promise<void> {
    this.audio = document.getElementById('my-phishing-audio') as HTMLAudioElement;
    let audioFile: Blob;
    try {
      audioFile = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}phishing/audio/phishing${localStorage.getItem("name") ? "-" + localStorage.getItem("name") : ""}.mp3`);
    } catch (error) {
      try {
        audioFile = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}phishing/audio/phishing.mp3`);
      } catch (error) {
        try {
          audioFile = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrlPrefix}phishing/audio/phishing.mp3`);
        } catch (error) {
          this.router.navigate(['/page-not-found']);
        }
      }
    }
    this.audio.src = URL.createObjectURL(audioFile!);
    let json: Blob;
    try {
      json = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}phishing/phishing.json`);
      handleData(JSON.parse(await json.text()));
    } catch (error) {
      try {
        json = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrlPrefix}phishing/phishing.json`);
        handleData(JSON.parse(await json.text()));
      } catch (error) {
        this.router.navigate(['/page-not-found']);
      }
    }
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
