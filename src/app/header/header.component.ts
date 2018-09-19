import { Subscription } from 'rxjs';
import { WorkPackageDetailService } from './../work-packages/work-package-detail/work-package-detail.service';
import { SettingsService } from './../settings/settings.service';
import { HandleSnackbarService } from '../send-data-snackbar/handle-snackbar.service';
import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  header: string;
  subheader: string;

  arrowBack: boolean;
  lastRoute: string;
  wpTitle: string;
  sup: Subscription;

  constructor(public router: Router, public handleSnackbarService: HandleSnackbarService, private settingsService: SettingsService,
    public workPackageDetailService: WorkPackageDetailService) {
    this.arrowBack = false;
  }

  ngOnInit() {

    this.wpTitle = '';
    // this.header = '';
    this.header = 'Project: ' + this.settingsService.get('project');

    this.router.events.subscribe((event) => {

      this.lastRoute = '/work-packages';
      this.arrowBack = true;
      this.header = 'Project: ' + this.settingsService.get('project');
      this.subheader = '';
      switch (this.router.url) {

        case '/settings':
          this.header = 'Project: ' + this.settingsService.get('project');
          break;

        case '/work-package-create':
          this.header = 'Project: ' + this.settingsService.get('project');
          break;

        case '/':
          /*    if (this.sup)
               this.sup.unsubscribe(); */
          this.arrowBack = false;
          this.header = 'Project: ' + this.settingsService.get('project');
          break;

        case '/work-package-detail':
          this.sup = this.workPackageDetailService.wp$.subscribe((e) => {
            if (this.router.url == '/work-package-detail') {
              this.header = 'Project: ' + this.settingsService.get('project');
              this.subheader = 'Work package: ' + e.title;
            }
          });


          break;

        default:

      };

    });


  }

  hideSnackbar() {
    //   this.handleSnackbarService.show = false;
    // console.log("Hides")
  }


}
