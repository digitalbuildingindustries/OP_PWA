import { Injectable } from '@angular/core';
import { interval } from 'rxjs';


@Injectable()
export class UpdateAppService {

  constructor() {
    /* 
        if (!this.swUpdate.isEnabled) {
          console.log('Nope 🙁');
        }
        else {
          console.log('Yep :-)');
        } */

    /*     swUpdate.activated.subscribe(event => {
          window.location.reload();
        }); */

    /*     interval(6 * 60 * 60).subscribe(() => swUpdate.checkForUpdate()); */

    /* interval(1000).subscribe(() => {
      if (this.swUpdate.checkForUpdate()) {
        console.log("ok");
        window.location.reload();
      }
    }); */

    /*     swUpdate.available.subscribe(() => {
          window.location.reload();
          console.log("any");
        });
     */




/*     this.swUpdate.available.subscribe(evt => {
      const snack = this.snackbar.open('Update Available', 'Reload');

      snack
        .onAction()
        .subscribe(() => {
          window.location.reload();
        });

      setTimeout(() => {
        snack.dismiss();
      }, 6000);
    });
 */
  }
}