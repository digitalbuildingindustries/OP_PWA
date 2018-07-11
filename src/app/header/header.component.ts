import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() debugReload = new EventEmitter<boolean>();

  header: string;
  rounter: Router;
 
  arrowBack: boolean;
  create: boolean;
  lastRoute: string;

  constructor(public router: Router) {
    this.arrowBack = false;
  }

  ngOnInit() {
    this.header = '';
    let tempRoute;

    this.router.events.subscribe((event) => {
      //save last route
      if (tempRoute != this.router.url) {
        this.lastRoute = tempRoute;
      }
      tempRoute = this.router.url;
      this.debugReload.emit(false);
      //set BackButton visibility + set Backbutton Action + set Header Label
      switch (this.router.url) {

        case '/work-package-tab':
          this.arrowBack = true;
          this.header = 'Work package Detail';
          tempRoute = '/work-packages';
          break;
        case '/work-package-create':
          this.arrowBack = true;
          //tempRoute = '/work-package-tab';
          this.header = 'Create Work package';
          tempRoute = '/work-packages';
          break;
        case '/work-packages':
          this.header = 'Work packages';
          this.arrowBack = false;
          tempRoute = '/work-packages';
          break;
        case '/':
          this.header = 'Work packages ';
          this.arrowBack = false;
          tempRoute = '/work-packages';
          this.debugReload.emit(true);
          break;
          case '/work-package-detail':
          this.header = 'Work package details ';
          this.arrowBack = true;
          tempRoute = '/work-packages';
          this.debugReload.emit(true);
          break;
        default:
          //this.arrowBack = false;
      };
       });
  }

}
