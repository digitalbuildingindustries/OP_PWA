import { SettingsService } from './settings/settings.service';
import { HandleSnackbarService } from './snackbar-popup/handle-snackbar.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sb: boolean;
  debugButton: boolean;
  deferredPrompt: any;

  constructor(
    public handleSnackbarService: HandleSnackbarService, public settingsService: SettingsService
  ) {
    this.sb = this.handleSnackbarService.show;
  }

  ngOnInit() {
    this.settingsService.checkdefaultSettings();
  }

}
