import { IDialogData } from "../dialog/dialog.component";
import { MatDialogConfig } from "@angular/material/dialog";

export class DialogDataBinder extends MatDialogConfig<IDialogData> {
  public override data: IDialogData = {};
  override panelClass = "custom-dialog-container";
  constructor(
    public headerText?: string,
    public videoName?: string,
    public audioName?: string,
    public emailAddress?: string,
  ) {
    super();
    if (headerText) {
      this.data.header = headerText;
    }
    if (videoName) {
      this.data.videoName = videoName;
    }
    if (emailAddress) {
      this.data.emailAddress = emailAddress;
    }
    if (audioName) {
      this.data.audioName = audioName;
    }
  }
}
