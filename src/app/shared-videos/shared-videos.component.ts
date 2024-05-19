import { HttpClient } from "@angular/common/http";
import { Component, inject } from '@angular/core';
import { globalVariables } from "../common/global_variables";
import { ActivatedRoute } from "@angular/router";
import { AnimationPlayer, asyncHandleData, handleData } from "../common/create-animation.function";
import { Observable } from "rxjs";
import { MyComment, SharedDataService } from "../common/shared-data.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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
  animationPlayers: AnimationPlayer[] = [];
  audio: HTMLAudioElement | undefined;
  header: string = "";
  rating: number = 0;
  sharedDataService = inject(SharedDataService);
  sharedData$?: Observable<{userId: string, rating: number, id: string}[]>;
  sharedComments$?: Observable<{}[]>;
  ratingAvg: number = 0;
  votedString: string = "You did not vote yet.";
  alreadyVoted: boolean = false;
  wantedRate: boolean = false;
  wantedComments: boolean = false;
  comments: MyComment[] = [];
  comment: string = "";
  myRatingDocumentId: string = "";

  get userId() { return SharedDataService.userId; }
  get displayName() { return SharedDataService.displayName; }
  get myEmail() { return SharedDataService.email; }

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {
    this.route.queryParams.subscribe(params => {
      this.emailAddress = params['emailaddress']|| "";
      this.videoName = params['videoname'] || "";
      this.audioName = params['audioname'] || "";
      if (this.emailAddress !== "" || this.videoName !== "") {
        this.header = `${this.emailAddress}'s "${this.videoName}"`;
      }
    });
    this.sharedData$ = this.sharedDataService.getCollectionData(`sharedvideos/${this.header}/ratings`) as  Observable<{userId: string, rating: number, id: string}[]>;
    this.sharedComments$ = this.sharedDataService.getComments(`sharedvideos/${this.header}/comments`) as  Observable<{}[]>;
  }

  async ngOnInit(): Promise<void> {
    this.audio = document.getElementById('my-shared-videos-audio') as HTMLAudioElement;
    const audioFile = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrl}${this.emailAddress}/vid_${this.videoName}/${this.audioName}`);
    this.audio.src = URL.createObjectURL(audioFile);
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
      this.header = "Error while loading data";
      }, false
    );
    try {
      const json = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrl}${this.emailAddress}/vid_${this.videoName}/${this.videoName}.json`);
      this.animationPlayers = await asyncHandleData(JSON.parse(await json.text()));
    } catch (error) {
      this.header = "Error while loading data";
    }
    /*this.audio.src = `${globalVariables.bucketUrlPrefix}users/${this.emailAddress}/vid_${this.videoName}/${this.audioName}`;
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

  rateChange() {
    this.audio = document.getElementById("my-shared-videos-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }

  async onRate(rating: number) {
    if (this.emailAddress !== this.myEmail) {
      if (this.alreadyVoted) {
        await this.sharedDataService.updateRating(`sharedvideos/${this.header}/ratings/${this.myRatingDocumentId}`, `rating`, rating);
      } else {
        await this.sharedDataService.addRating(`sharedvideos/${this.header}/ratings`, {userId: this.userId, rating: rating});
      }
    } else {
      this._snackBar.open("You cannot rate your own video.");
    }
  }

  wantRate() {
    this.wantedRate = true;
    this.sharedData$!.subscribe(data => {
      let sum = 0;
      let count = 0;
      let myVote = undefined;
      data.forEach((elem) => {
        if (elem.userId === this.userId) {
          myVote = elem.rating;
          this.myRatingDocumentId = elem.id;
        }
        sum += elem.rating;
        count++;
      });
      this.ratingAvg = Number((sum/count).toFixed(3));
      if (this.emailAddress === this.myEmail) {
        this.votedString = `The average rating is ${this.ratingAvg | 0} out of 5 (Total: ${count} votes)`;
        this.rating = this.ratingAvg;
      } else {
        if (myVote !== undefined) {
          this.alreadyVoted = true;
          this.votedString = `You voted ${myVote} out of 5. (Avg: ${this.ratingAvg})`;
          this.rating = myVote;
        }
        if (!this.alreadyVoted) {
          this.rating = this.ratingAvg;
          this.votedString = `The average rating is ${this.ratingAvg | 0} out of 5.`;
        }
      }
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
