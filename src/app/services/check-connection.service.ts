import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class CheckConnectionService {

  online$: Observable<boolean>;
  //Is there any internetconnection?
  internetConnectionStatus: boolean;

  constructor() {

    this.online$ = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').mapTo(true),
      Observable.fromEvent(window, 'offline').mapTo(false)
    )

    this.online$.subscribe(isOnline => {
      if (isOnline) {
        this.internetConnectionStatus = true;
      } else {
        this.internetConnectionStatus = false;
      }
    });

  }

}
