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
  get email() { return SharedDataService.email; }
  sharedDataService = inject(SharedDataService);

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.displayedColumns = ["name", "play", "copy", "delete"];
    this.getVideos();
    this.loadDefaultJSON();
  }


  videoSubmit(form: NgForm) {
    let file: File = new File([this.JSONFile], `${form.value.name}.json`, {type: "application/json"});
    this.uploadFile(file, form);
    this.uploadFile(this.selectedFile!, form);
    this.resetForm(form);
    this.getVideos();
  }

  uploadFile(file: File, form: NgForm) {
    this.http.post<any>(
      `${globalVariables.bucketObjectPrefixWithoutSlash}?name=users/${localStorage.getItem("useremail")}/vid_${form.value.name}/${file.name}`,
      file,
      /**{headers: {
        "Content-Type": file.type,
        "Authorization": `Bearer ${this.accessToken}`,
      }}*/
    )
    .subscribe({
      next: () => {
        console.log(`${file.name} added successfully`);
      },
      error: (err) => {
        console.log(`Error occured while adding ${file.name}: ${err.message}`);
      }
    });
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

  onDelete(element: Video) {
    console.log(`${globalVariables.bucketObjectPrefix}${element.name}`);
    this.sharedDataService.deleteAnimationData(`sharedvideos/${this.email}'s "${element.name}"`);
    this.http.delete<any>(`${globalVariables.bucketUrlPrefix}users/${this.email.replace("@","%40")}/vid_${element.name}/`)
    .subscribe({
      next: (data) => {
        console.log("Deleted successfully");
        this.getVideos();
      },
      error: (err) => {
        console.log("Error occured while fetching data: " + err.message);
      }
    });
  }

  formatJSON() {
    if (this.JSONFile) {
      try { JSON.parse(this.JSONFile) } catch { this.isValidJSON = false }
      if (!this.isValidJSON) {
        console.log("Invalid JSON");
      } else {
        this.JSONFile = JSON.stringify(JSON.parse(this.JSONFile), null, 4);
      }
    }
  }

  resetForm(form: NgForm) {
    this.selectedFile = undefined;
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
    this.http.get<any>(`${globalVariables.bucketObjectPrefix}?prefix=users/${localStorage.getItem("useremail")}/vid`)
    .subscribe({
      next: (data) => {
        Promise.all(data.items.map((item: any) => {
          const videoName = item.name.split(`users/${localStorage.getItem("useremail")}/vid_`)[1].split("/")[0];
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
        console.log("Error occured while fetching data: " + err.message);
      }
    });
  }
}
