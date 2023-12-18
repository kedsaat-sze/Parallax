import { Component, OnInit } from '@angular/core';
import { AngularDeviceInformationService } from "angular-device-information";
import { globalVariables } from "./common/global_variables";
import { ActivatedRoute } from "@angular/router";
import { SocialAuthService } from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'parallax';
  client = "";
  name = ""
  get germanPage() { return globalVariables.germanPage; }

  constructor(
    private deviceInformationService: AngularDeviceInformationService,
    private route: ActivatedRoute,
    protected socialAuthService: SocialAuthService) {
    globalVariables.usedOs = this.deviceInformationService.getDeviceInfo().os.toLowerCase();
    if (this.deviceInformationService.getDeviceInfo().os.toLowerCase().includes("mac")) {
      globalVariables.usedOs = "mac";
    } else if (this.deviceInformationService.getDeviceInfo().os.toLowerCase().includes("windows")) {
      globalVariables.usedOs = "windows";
    } else {
      console.log("other");
    }
  }


  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      localStorage.setItem("username", user.name);
      localStorage.setItem("useremail", user.email);
    });
  }

}
