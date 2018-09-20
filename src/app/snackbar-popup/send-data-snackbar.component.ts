import { HandleSnackbarService } from './handle-snackbar.service';
import { Observable } from 'rxjs';
import { Component, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-send-data-snackbar',
  template: `
  <ng-template appSnackbar></ng-template>
  `,
  styles: [`
    `]
})
export class SendDataSnackbarComponent {

  @Input()
  title: string;
  @Input()
  number: number; 
  //Possible Events
  @Input()
  status: 'wpSent' | 'wpsSent' |'wpNotSent' | 'attachmentSent' | 'attachmentNotSent' | 'noInternet' | 'settingsUpdated';
  @Input()
  duration: number;

  interval: Observable<number>;
  color: 'green-snackbar' | 'red-snackbar';
  text: string;

  constructor(public handleSnackbarService: HandleSnackbarService,
    public snackBar: MatSnackBar,
  ) {  }

  ngOnInit() {
    let config = new MatSnackBarConfig();
    if (!this.duration) {
      config.duration = 3000;
    }
    else {
      config.duration = this.duration;
    }
    setTimeout(() => {
      //Sets the Text of the Snackbar-PopUp-Feedback
      switch (this.status) {
        case 'wpSent': {
          this.color = 'green-snackbar';
          this.text = 'Workpackage "' + this.title + '" was sent!';
          break;
        }
        case 'wpsSent': {
          this.color = 'green-snackbar';
          this.text = this.number + ' workpackages were sent!';
          break;
        }
        case 'wpNotSent': {
          this.color = 'red-snackbar';
          this.text = 'No Internet connection. Workpackage "' + this.title + '" will be sent when you go back online';
          break;
        }
        case 'attachmentSent': {
          this.color = 'green-snackbar';
          this.text = 'Attachment added.'
          break;
        }
        case 'attachmentNotSent': {
          this.color = 'red-snackbar';
          this.text = 'No Internet connection. Attachment cannot be added. Go online and try again.'
          break;
        }
        case 'noInternet': {
          this.color = 'red-snackbar';
          this.text = 'No internet connection.';
          break;
        }
        case 'settingsUpdated': {
          this.color = 'green-snackbar';
          this.text = 'Settings updated.';
          break;
        }
      }
      config.panelClass = [this.color];
      this.snackBar.open(this.text, '', config);
      this.handleSnackbarService.show = false;
    });
  }

}
