import { HttpClient } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { globalVariables } from "../common/global_variables";
import { ActivatedRoute } from "@angular/router";
import { handleData } from "../common/create-animation.function";
import { Observable } from "rxjs";
import { MyComment, SharedDataService } from "../common/shared-data.service";

@Component({
  selector: 'app-shared-videos',
  templateUrl: './shared-videos.component.html',
  styleUrls: ['./shared-videos.component.scss']
})
export class SharedVideosComponent {
  isLoggedinUser: boolean = false;
  videoName: string = "";
  emailAddress: string = "";
  audioName: string = "";
  animationPlayers: {animationPlayer: Animation, elementId: string}[] = [];
  audio: HTMLAudioElement | undefined;
  header: string = "";
  rating: number = 0;
  sharedDataService = inject(SharedDataService);
  sharedData$?: Observable<{}[]>;
  sharedComments$?: Observable<{}[]>;
  ratingAvg: number = 0;
  votedString: string = "You did not vote yet.";
  alreadyVoted: boolean = false;
  wantedRate: boolean = false;
  wantedComments: boolean = false;
  comments: MyComment[] = [];
  comment: string = "";

  get userId() { return SharedDataService.userId; }
  get displayName() { return SharedDataService.displayName; }
  get myEmail() { return SharedDataService.email; }

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      this.emailAddress = params['emailaddress']|| "";
      this.videoName = params['videoname'] || "";
      this.audioName = params['audioname'] || "";
      if (this.emailAddress !== "" || this.videoName !== "") {
        this.header = `${this.emailAddress}'s "${this.videoName}"`;
      }
    });
    this.sharedData$ = this.sharedDataService.getCollectionData(`sharedvideos`) as  Observable<{}[]>;
    this.sharedComments$ = this.sharedDataService.getComments(`sharedvideos/${this.header}/comments`) as  Observable<{}[]>;
  }

  async ngOnInit(): Promise<void> {
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

  async onRate(rating: number) {
    await this.sharedDataService.updateRating(`sharedvideos/${this.header}`, `ratings.${this.userId}`, rating);
  }

  wantRate() {
    this.wantedRate = true;
    this.sharedData$!.subscribe(data => {
      let sum = 0;
      let count = 0;
      data.forEach((element: any) => {
        const myVote = element.ratings[this.userId];
        Object.values(element.ratings).forEach((elem) => {
          sum += Number(elem);
          count++;
        });
        this.ratingAvg = Number((sum/count).toFixed(3));
        if (myVote !== undefined) {
          this.alreadyVoted = true;
          this.votedString = `You voted ${myVote} out of 5. (Avg: ${this.ratingAvg})`;
          this.rating = myVote;
        }
        if (!this.alreadyVoted) {
          this.rating = this.ratingAvg;
          this.votedString = `The average rating is ${this.ratingAvg} out of 5.`;
        }
      });
    });
  }

  wantComments() {
    this.wantedComments = true;
    this.sharedComments$!.subscribe(data => {
      this.comments = data as MyComment[];
    });
  }

  toDate(timestamp: string) {
    return new Date(timestamp).toLocaleString();
  }

  async writeComment() {
    const comment: MyComment = {
      userId: this.userId,
      email: this.myEmail,
      displayname: this.displayName,
      comment: this.comment,
      timestamp: new Date().toISOString()
    }
    await this.sharedDataService.addComment(`sharedvideos/${this.header}/comments`, comment);
    //this.sharedDataService.firestore.collection(`sharedvideos/${this.header}/comments`).add(comment);
    this.comment = "";
  }
}
