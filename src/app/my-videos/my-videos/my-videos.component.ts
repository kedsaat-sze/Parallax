import { GoogleLoginProvider, SocialAuthService } from "@abacritt/angularx-social-login";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { globalVariables } from "src/app/common/global_variables";
import defaultJson from "../../../assets/default_movie_description.json";

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
  private accessToken: string = "";
  isLoggedinUser: boolean = false;
  dataSource: Video[] = [];
  displayedColumns: string[] = [];
  modifyMode: boolean = false;
  modifyRecord: Video = {};
  editorOptions = {theme: 'vs-dark', language: 'json'};
  isValidJSON = true;
  JSONFile = "";
  selectedFile: File | undefined;
  selectedVideo: Video | undefined;

  constructor(
    private http: HttpClient,
    private socialAuthService: SocialAuthService
  ) {}

  async ngOnInit(): Promise<void> {
    this.socialAuthService.authState.subscribe((user) => {
      this.isLoggedinUser = localStorage.getItem("useremail") === user.email;
    });
    this.getAccessToken();
    this.displayedColumns = this.isLoggedinUser ? ["name", "modify"] : ["name"];
    this.getVideos();
    this.loadDefaultJSON();
  }

  getAccessToken(): void {
    this.socialAuthService.getAccessToken(GoogleLoginProvider.PROVIDER_ID).then((accessToken) => {
      this.accessToken = accessToken;
    });
  }

  videoSubmit(form: NgForm) {
    if (this.modifyMode) {
      /** this.http.put<any>(`${globalVariables.bucketObjectPrefix}users/${localStorage.getItem("useremail")}/vid_${this.modifyRecord.name}/movie_description.json`, form.value)
      .subscribe({
        next: (data) => {
          console.log("Video updated successfully");
          this.resetForm(form);
          this.getVideos();
        },
        error: (err) => {
          console.log("Error occured while updating video: " + err.message);
        }
      }); */
    } else {
      let file: File = new File([this.JSONFile], `${form.value.name}.json`, {type: "application/json"});
      this.uploadFile(file, form);
      this.uploadFile(this.selectedFile!, form);
      this.resetForm(form);
      this.getVideos();
    }
  }

  uploadFile(file: File, form: NgForm) {
    this.http.post<any>(
      `${globalVariables.bucketObjectPrefixWithoutSlash}?name=users/${localStorage.getItem("useremail")}/vid_${form.value.name}/${file.name}`,
      file,
      {headers: {
        "Content-Type": file.type,
        "Authorization": `Bearer ${this.accessToken}`,
      }})
    .subscribe({
      next: () => {
        console.log(`${file.name} added successfully`);
      },
      error: (err) => {
        console.log(`Error occured while adding ${file.name}: ${err.message}`);
      }
    });
  }

  onModify(element: Video) {
    this.modifyMode = true;
    this.http.get<any>(`${globalVariables.bucketUrlPrefix}${element.json}`)
    .subscribe({
      next: (data) => {
        this.JSONFile = JSON.stringify(data);
        this.formatJSON();
      },
      error: error => {
        console.log("Error occured while fetching JSON file: " + error.message);
      }
    });
    this.modifyRecord.name = element.name;
    this.http.get<any>(`${globalVariables.bucketUrlPrefix}${element.audio}`)
    .subscribe({
      next: (data) => {console.log(data, {depth: null});}, //this.selectedFile = new FileInput([data], element.audio!.split("/")[2]);},
      error: error => {
        console.log("Error occured while fetching JSON file: " + error.message);
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
    this.modifyMode = false;
    this.modifyRecord = {};
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
