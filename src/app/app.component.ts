import { Component, OnInit, inject } from '@angular/core';
import { AngularDeviceInformationService } from "angular-device-information";
import { globalVariables } from "./common/global_variables";
import { SocialAuthService } from "@abacritt/angularx-social-login";
import { Auth, GoogleAuthProvider, signInWithPopup } from "@angular/fire/auth";
import { SharedDataService } from "./common/shared-data.service";

interface User {
  loggedIn: boolean;
  name: string;
  email: string;
  uid: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user: User = {
    loggedIn: false,
    name: "",
    email: "",
    uid: ""
  };
  title = 'parallax';
  client = "";
  name = ""
  private auth: Auth = inject(Auth);
  private provider = new  GoogleAuthProvider();
  get germanPage() { return globalVariables.germanPage; }

  constructor(
    private deviceInformationService: AngularDeviceInformationService,
  ) {
    localStorage.clear();
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
  }

  login() {
    signInWithPopup(this.auth, this.provider).then((result) => {
      const  credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        this.user.uid = result.user.uid;
        SharedDataService.userId = this.user.uid;
        SharedDataService.displayName = result.user.displayName || "Anonymous";
        SharedDataService.email = result.user.email || "anonymous@parallax.com";
        this.user.name = result.user.displayName || "Anonymous";
        this.user.email = result.user.email || "anonymous@parallax.com";
        this.user.loggedIn = true;
        localStorage.setItem("username", this.user.name);
        localStorage.setItem("userId", this.user.uid);
        localStorage.setItem("useremail", this.user.email);
      }
      return  credential;
})
  }

}
