import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { globalVariables } from "../../common/global_variables";
import { handleData } from "../../common/create-animation.function";
import { setLocalStorage } from "../../common/set-local-storage.function";
import { SharedDataService } from "../../../app/common/shared-data.service";

@Component({
  selector: 'app-password-and-authentication',
  templateUrl: './password-and-authentication.component.html',
  styleUrls: ['./password-and-authentication.component.scss']
})
export class PasswordAndAuthenticationComponent {
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
    this.audio = document.getElementById('my-pw-and-auth-audio') as HTMLAudioElement;
    let audioFile: Blob;
    try {
      audioFile = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}password_and_authentication/audio/password_and_authentication${localStorage.getItem("name") ? "-" + localStorage.getItem("name") : ""}.mp3`);
    } catch (error) {
      try {
        audioFile = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}password_and_authentication/audio/password_and_authentication.mp3`);
      } catch (error) {
        try {
          audioFile = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrlPrefix}password_and_authentication/audio/password_and_authentication.mp3`);
        } catch (error) {
          this.router.navigate(['/page-not-found']);
        }
      }
    }
    this.audio.src = URL.createObjectURL(audioFile!);
    let json: Blob;
    try {
      json = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrlPrefix}${localStorage.getItem("client") ? localStorage.getItem("client") + "/" : ""}password_and_authentication/password_and_authentication.json`);
      handleData(JSON.parse(await json.text()), true);
    } catch (error) {
      try {
        json = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrlPrefix}password_and_authentication/password_and_authentication.json`);
        handleData(JSON.parse(await json.text()), true);
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
    this.audio = document.getElementById("my-pw-and-auth-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }

}
