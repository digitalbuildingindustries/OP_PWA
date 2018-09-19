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
  @Input()
  status: 'wpSent' | 'wpsSent' |'wpNotSent' | 'attachmentSent' | 'attachmentNotSent' | 'noInternet';
  @Input()
  duration: number;

  interval: Observable<number>;
  color: string;
  text: string;

  constructor(public handleSnackbarService: HandleSnackbarService,
    public snackBar: MatSnackBar,
  ) {

  }
  ngOnInit() {
    let config = new MatSnackBarConfig();
    if (!this.duration) {
      config.duration = 3000;
    }
    else {
      config.duration = this.duration;
    }
    setTimeout(() => {
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
      }

      config.panelClass = [this.color];
      let snackbarRef = this.snackBar.open(this.text, '', config);

      this.handleSnackbarService.show = false;
    });
  }

}
