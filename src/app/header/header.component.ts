import { Subscription } from 'rxjs';
import { WorkPackageDetailService } from '../work-packages/work-package-detail/work-package-detail.service';
import { SettingsService } from '../settings/settings.service';
import { HandleSnackbarService } from '../snackbar-PopUp/handle-snackbar.service';
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

  constructor(private router: Router, private settingsService: SettingsService, private workPackageDetailService: WorkPackageDetailService) {
  }

  ngOnInit() {
    this.arrowBack = false;
    this.wpTitle = '';
    this.header = 'Project: ' + this.settingsService.get('project');

    //listen for route changes
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

      };

    });

  }

}
