import { HttpClient } from "@angular/common/http";
import { Component } from '@angular/core';
import { globalVariables } from "../common/global_variables";
import { ActivatedRoute } from "@angular/router";
import { handleData } from "../common/create-animation.function";
import { GoogleLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-shared-videos',
  templateUrl: './shared-videos.component.html',
  styleUrls: ['./shared-videos.component.scss']
})
export class SharedVideosComponent {
  isLoggedinUser: boolean = false;
  private accessToken: string = "";
  videoName: string = "";
  emailAddress: string = "";
  audioName: string = "";
  animationPlayers: {animationPlayer: Animation, elementId: string}[] = [];
  audio: HTMLAudioElement | undefined;
  header: string = "";
  rating: number = 0;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private socialAuthService: SocialAuthService,
  ) {
    this.route.queryParams.subscribe(params => {
      this.emailAddress = params['emailaddress']|| "";
      this.videoName = params['videoname'] || "";
      this.audioName = params['audioname'] || "";
      if (this.emailAddress !== "" || this.videoName !== "") {
        this.header = `${this.emailAddress}'s "${this.videoName}" video`;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.socialAuthService.authState.subscribe((user) => {
      this.isLoggedinUser = localStorage.getItem("useremail") === user.email;
    });
    await this.getAccessToken();
    this.audio = document.getElementById('my-audio') as HTMLAudioElement;
    this.audio.src = `${globalVariables.bucketUrlPrefix}users/${this.emailAddress}/vid_${this.videoName}/${this.audioName}`;
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
      this.header = "Error while loading data";
      }, false);
    this.http.get<any>(`${globalVariables.bucketUrlPrefix}users/${this.emailAddress}/vid_${this.videoName}/${this.videoName}.json`)
    .subscribe({
      next: (data) => {this.animationPlayers = handleData(data)},
      error: err => {
        this.header = "Error while loading data";
      }
    });
  }

  async getAccessToken(): Promise<void> {
    this.socialAuthService.initState.subscribe({complete: () => {
      console.log("rediii");
      this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then((accessToken) => {
        this.accessToken = accessToken;
      });
    }});
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
    this.http.get<any>("https://firestore.googleapis.com/v1/projects/sbox-parallax/databases/(default)/test",
    {headers: {
      "Authorization": `Bearer ${this.accessToken}`,
    }})
    .subscribe({
      next: (data) => {console.log(data)},
      error: err => {
        console.log("fing");
      }
    });
    this.audio!.paused ? this.audio!.play() : this.audio!.pause();
  }

  rateChange() {
    this.audio = document.getElementById("my-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }

  onRate(rating: number) {
    this.rating = rating;
    console.log(this.rating);
  }
}
