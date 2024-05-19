import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";
import { globalVariables } from "../../global_variables";
import { AnimationPlayer, handleData } from "../../create-animation.function";

export interface IDialogData {
  header?: string;
  emailAddress?: string;
  videoName?: string;
  audioName?: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  animationPlayers: AnimationPlayer[] = [];
  audio: HTMLAudioElement | undefined;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDialogData
  ) { }


  ngOnInit(): void {
    this.audio = document.getElementById('my-dialog-audio') as HTMLAudioElement;
    this.audio.src = `${globalVariables.bucketUrlPrefix}${this.dialogData.audioName}`;
    this.audio.addEventListener('error', (event)=> {
      event.preventDefault();
      this.dialogData.header = "Error while loading data";
      }, false);
    this.http.get<any>(`${globalVariables.bucketUrlPrefix}users/${this.dialogData.emailAddress}/vid_${this.dialogData.videoName}/${this.dialogData.videoName}.json`)
    .subscribe({
      next: (data) => {handleData(data)},
      error: err => {
        this.dialogData.header = "Error while loading data";
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
    this.audio = document.getElementById("my-dialog-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }

  onClose() {
    this.dialogRef.close();
  }
}
