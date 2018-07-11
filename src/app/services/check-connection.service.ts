import { SendDataToServerService } from './send-data-to-server.service';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

import 'rxjs/Rx';

@Injectable()
export class CheckConnectionService {

  online$: Observable<boolean>;
  internetConnectionStatus: boolean;

  constructor(public sendDataToServerService: SendDataToServerService) {

      this.online$ = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').mapTo(true),
      Observable.fromEvent(window, 'offline').mapTo(false)
    )

    this.online$.subscribe(isOnline => {
      if (isOnline) {
        //console.log("The App is online");
        this.internetConnectionStatus = true;
        //this.sendDataToServerService.sendWorkpackages();
        
      } else {
        //console.log("you are offline");
        // console.log(isOnline);
        this.internetConnectionStatus = false;
      }
    });




  }

  


}
