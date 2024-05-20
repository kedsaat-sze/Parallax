import { HttpClient } from "@angular/common/http";
import { Component, OnInit, inject } from '@angular/core';
import { NgForm } from "@angular/forms";
import { globalVariables } from "../../common/global_variables";
import defaultJson from "../../../assets/default_movie_description.json";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../common/components/dialog/dialog.component";
import { DialogDataBinder } from "../../common/components/dialog/dialog.data.binder";
import { SharedDataService } from "src/app/common/shared-data.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Clipboard } from '@angular/cdk/clipboard';

export interface Video {
  name?: string;
  json?: string;
  audio?: string;
}

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss']
})
export class MyVideosComponent implements OnInit {
  dataSource: Video[] = [];
  displayedColumns: string[] = [];
  editorOptions = {theme: 'vs-dark', language: 'json'};
  isValidJSON = true;
  JSONFile = "";
  selectedFile: File | undefined;
  selectedVideo: Video | undefined;
  modifyMode = false;
  get email() { return SharedDataService.email; }
  sharedDataService = inject(SharedDataService);

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.displayedColumns = ["name", "play", "copy", "modify", "delete"];
    this.getVideos();
    this.loadDefaultJSON();
  }


  async videoSubmit(form: NgForm) {
    let file: File = new File([this.JSONFile], `${form.value.name}.json`, {type: "application/json"});
    if (!this.modifyMode) {
      const objectPaths = `${globalVariables.gsBucketUrl}${this.email}/vid_${form.value.name}/`;
      await this.sharedDataService.createAnimation(objectPaths,file, this.selectedFile!);
    } else {
      const objectPaths = `${globalVariables.gsBucketUrl}${this.email}/vid_${this.selectedVideo!.name}/`;
      await this.sharedDataService.updateJson(`${objectPaths}${this.selectedVideo!.name}.json`, file);
    }
    this.resetForm(form);
    this.getVideos();
  }

  async onCopy(element: Video) {
    this._snackBar.open("Copied to clipboard!");
    await this.clipboard.copy(`${location.hostname}/sharedvideos?emailaddress=${this.email}&videoname=${element.name}&audioname=${element.audio?.split("/").pop()}`);
  }


  onPlay(element: Video) {
    const dialogRef = this.dialog.open(
      DialogComponent,
      new DialogDataBinder(
        element.name,
        element.name,
        element.audio,
        localStorage.getItem("useremail") || undefined
      )
    );
  }

  async onModify(element: Video) {
    this.modifyMode = true;
    this.selectedVideo = element;
    try {
      const json = await this.sharedDataService.getAnimationFile(`${globalVariables.gsBucketUrl}${this.email}/vid_${element.name}/${element.name}.json`);
      this.JSONFile = JSON.stringify(JSON.parse(await json.text()), null, 4);
    } catch (error) {
      this._snackBar.open("Error occured while fetching data!");
    }
  }

  onDelete(element: Video) {
    const objectPaths = `${globalVariables.gsBucketUrl}${this.email}/vid_${element.name}/`;
    this.sharedDataService.deleteAnimationData(`sharedvideos/${this.email}'s "${element.name}"`, `${objectPaths}${element.name}.json`, `${objectPaths}${element.audio?.split("/").pop()}`);
    this.getVideos();
  }

  formatJSON() {
    if (this.JSONFile) {
      try { JSON.parse(this.JSONFile) } catch { this.isValidJSON = false }
      if (!this.isValidJSON) {
        this._snackBar.open("Invalid JSON");
      } else {
        this.JSONFile = JSON.stringify(JSON.parse(this.JSONFile), null, 4);
      }
    }
  }

  resetForm(form: NgForm) {
    this.selectedFile = undefined;
    this.modifyMode = false;
    this.JSONFile = "";
    this.selectedVideo = undefined;
    form.resetForm();
    this.loadDefaultJSON();
  }

  loadDefaultJSON() {
    const tempJson = defaultJson;
    this.JSONFile = JSON.stringify({movie: tempJson.movie}, null, "\t");
    this.formatJSON();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  getVideos() {
    let tempData: Video[] =[];
    this.http.get<any>(`${globalVariables.bucketObjectPrefix}?prefix=users/${this.email}/vid`)
    .subscribe({
      next: (data) => {
        Promise.all(data.items.map((item: any) => {
          const videoName = item.name.split(`users/${this.email}/vid_`)[1].split("/")[0];
          const found = tempData.find((element) => {
            return element.name === videoName;
          });
          const isJson = item.name.endsWith(".json");
          if (found === undefined) {
            tempData.push({
              name: videoName,
              json: isJson ? item.name : "",
              audio: !isJson ? item.name : ""
            });
          } else {
            tempData[tempData.indexOf(found)][isJson ? "json" : "audio"] = item.name;
          }
          this.dataSource = tempData;
        }));
      },
      error: (err) => {
        this._snackBar.open("Error occured while fetching data!");
      }
    });
  }
}
