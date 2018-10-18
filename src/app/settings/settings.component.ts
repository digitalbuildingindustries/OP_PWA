import { Router } from '@angular/router';
import { HandleSnackbarService } from '../snackbar-popup/handle-snackbar.service';
import { CheckConnectionService } from '../services/check-connection.service';
import { Observable, Subscription } from 'rxjs';
import { SettingsService } from './settings.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  url: string;
  apikey: string;
  project: string;
  projects: string[];

  projects$: Observable<any>;
  constructor(public settingsService: SettingsService, public checkConnectionService: CheckConnectionService,
    private handleSnackbarService: HandleSnackbarService, public router: Router) { }

  ngOnInit() {
    this.settingsService.formValidator = true;
    this.router.events.subscribe((event) => {
      if (this.router.url == '/settings') {
        this.resetApiKey();
      }
    })

    /*    Observable.timer(2000,1000).subscribe(() => {
         this.formValidation();
       }); */

    this.apikey = this.settingsService.get('apikey');
    this.project = this.settingsService.get('project');
    this.settingsService.getProjects().subscribe((e) => {
      this.projects = e['_embedded'].elements;
    })
    this.projects$ = this.settingsService.getProjects();

    let timer = Observable.timer(6000, 1000);
    let s: Subscription = timer.subscribe(() => {
      if (!this.checkConnectionService.internetConnectionStatus) {
        this.handleSnackbarService.fillSnackbarWithContent('noInternet', null, null, 3000);
        s.unsubscribe();
      }
    });

  }

  ngOnDestroy() { }

  save() {
    this.setSnackbarContent();
    this.settingsService.update('url', this.url);
    this.settingsService.update('apikey', this.apikey);
    this.settingsService.update('project', this.project);
  }

  getSpinnerPosition(): string {
    return (screen.height / 2) - 100 - 56 + 'px';
  }

  setSnackbarContent(): void {
    if (this.settingsService.get('apikey') !== this.apikey || this.settingsService.get('project') !== this.project) {
      this.handleSnackbarService.fillSnackbarWithContent('settingsUpdated');
    }
  }

  formValidation() {
    console.log(this.apikey);
    this.settingsService.formValidator = false;
    this.settingsService.testuss(this.apikey).then((apikey) => {
      if (apikey === false) {
        this.settingsService.formValidator = false;
      }
      else {
        this.settingsService.formValidator = true;
      }
    })
  };

  resetApiKey() {
    this.apikey = this.settingsService.get('apikey');
  }

}
