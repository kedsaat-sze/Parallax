import { Component } from '@angular/core';
import { setLocalStorage } from "../common/set-local-storage.function";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  name: string = "";
  animationPlayers: {animationPlayer: Animation, elementId: string}[] = [];
  audio: HTMLAudioElement | undefined;
  client = "";

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.client = params['client']|| "";
      this.name = params['name'] || "";
    });
    setLocalStorage(this.client, this.name);
  }
}
