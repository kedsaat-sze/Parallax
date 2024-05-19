import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { globalVariables } from "../../global_variables";
import { handleData } from "../../create-animation.function";
import { SharedDataService } from "../../shared-data.service";

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
  sharedDataService = inject(SharedDataService);
  audio: HTMLAudioElement | undefined;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: IDialogData
  ) { }


  async ngOnInit(): Promise<void> {
    this.audio = document.getElementById('my-dialog-audio') as HTMLAudioElement;
    try {
      const audioFile = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrlPrefix}${this.dialogData.audioName}`);
      this.audio.src = URL.createObjectURL(audioFile);
    } catch (error) {
      this.dialogData.header = "Error while loading data";
    }
    try {
      const json = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrl}${this.dialogData.emailAddress}/vid_${this.dialogData.videoName}/${this.dialogData.videoName}.json`);
      handleData(JSON.parse(await json.text()));
    } catch (error) {
      this.dialogData.header = "Error while loading data";
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
    this.audio = document.getElementById("my-dialog-audio") as HTMLAudioElement;
    this.audio!.playbackRate = 1;
  }

  onClose() {
    this.dialogRef.close();
  }
}
