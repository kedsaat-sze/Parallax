import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { globalVariables } from "../../common/global_variables";
import { handleData } from "../../common/create-animation.function";
import { setLocalStorage } from "../../common/set-local-storage.function";
import { SharedDataService } from "src/app/common/shared-data.service";

@Component({
  selector: 'app-mobile-device-security',
  templateUrl: './mobile-device-security.component.html',
  styleUrls: ['./mobile-device-security.component.scss']
})
export class MobileDeviceSecurityComponent implements OnInit {
  name: string = "";
  audio: HTMLAudioElement | undefined;
  client = "";
  sharedDataService = inject(SharedDataService);

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.client = params['client']|| "";
      this.name = params['name'] || "";
    });
    setLocalStorage(this.client, this.name);
    globalVariables.germanPage = false;
  }

  async ngOnInit(): Promise<void> {
    this.audio = document.getElementById('my-mobile-device-security-audio') as HTMLAudioElement;
    let audioFile: Blob;
    try {
      audioFile = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrl}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/audio/mobile-device-security${localStorage.getItem("name") ? "-" + localStorage.getItem("name") : ""}.mp3`);
    } catch (error) {
      try {
        audioFile = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrl}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/audio/mobile-device-security.mp3`);
      } catch (error) {
        try {
          audioFile = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrl}mobile_device_security/audio/mobile-device-security.mp3`);
        } catch (error) {
          this.router.navigate(['/page-not-found']);
        }
      }
    }
    let json: Blob;
    try {
      json = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrl}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/mobile_device_security.json`);
      handleData(JSON.parse(await json.text()));
    } catch (error) {
      try {
        json = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrl}mobile_device_security/mobile_device_security.json`);
        handleData(JSON.parse(await json.text()));
      } catch (error) {
        this.router.navigate(['/page-not-found']);
      }
    }
    /*this.audio.src = `${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/audio/mobile-device-security${localStorage.getItem("name") ? "-" + localStorage.getItem("name") : ""}.mp3`;
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
    this.audio!.src = `${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/audio/mobile-device-security.mp3`;
      }, false);
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
      this.audio!.src = `${globalVariables.bucketUrlPrefix}mobile_device_security/audio/mobile-device-security.mp3`;
      }, false);
    this.http.get<any>(`${globalVariables.bucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}mobile_device_security/mobile_device_security.json`)
    .subscribe({
      next: (data) => {handleData(data, true)},
      error: err => {
        this.http.get<any>(`${globalVariables.bucketUrlPrefix}mobile_device_security/mobile_device_security.json`)
        .subscribe({
          next: (data) => {handleData(data, true)},
          error: error => {
            this.router.navigate(['/page-not-found']);
          }
        });
      }
    });*/
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
    this.audio = document.getElementById("my-mobile-device-security-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }

}
