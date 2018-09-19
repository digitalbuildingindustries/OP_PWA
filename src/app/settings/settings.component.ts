import { HandleSnackbarService } from './../send-data-snackbar/handle-snackbar.service';
import { CheckConnectionService } from './../services/check-connection.service';
import { Observable, Subscription } from 'rxjs';
import { SettingsService } from './settings.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy{

  url: string;
  apikey: string;
  project: string;
  projects: string[];

  projects$: Observable<any>;
  constructor(private settingsService: SettingsService, public checkConnectionService: CheckConnectionService, private handleSnackbarService: HandleSnackbarService) { }

  ngOnInit() {
    this.url = this.settingsService.get('url');
    this.apikey = this.settingsService.get('apikey');
    this.project = this.settingsService.get('project');
    this.settingsService.getProjects().subscribe((e) => {
      let f = e;
      console.log(e['_embedded'].elements);
      this.projects = e['_embedded'].elements;
      console.log(this.projects[0]['identifier']);
    })
    this.projects$ = this.settingsService.getProjects();

    let timer = Observable.timer(6000, 1000);
    let s: Subscription = timer.subscribe(() => {
      if (!this.checkConnectionService.internetConnectionStatus) {
        this.handleSnackbarService.fillSnackbarWithContent('noInternet', null, null, null, 9000);
        s.unsubscribe();
      }
    });
    
  }

  ngOnDestroy() {
   
  }

  save() {
    this.settingsService.update('url', this.url);
    this.settingsService.update('apikey', this.apikey);
    this.settingsService.update('project', this.project);
    console.log(this.url);
    console.log(this.apikey);
    console.log(this.project);
  }

  getSpinnerPosition() {
    return (screen.height / 2) - 100 - 56 + 'px';
  }
  
}
