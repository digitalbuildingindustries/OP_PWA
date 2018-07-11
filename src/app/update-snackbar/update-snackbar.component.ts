
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-update-snackbar',
  template:``,
  styles:[``]
})
export class UpdateSnackbarComponent {



  constructor(public snackBar: MatSnackBar) { 

 
/*
  this.swUpdate.available.subscribe(evt => {
    const snack = this.snackBar.open('Update Available', 'Reload');
    //window.location.reload();
    snack
      .onAction()
      .subscribe(() => {
        window.location.reload();
      });

      setTimeout(() => {
      snack.dismiss();
    }, 15000);
  });*/
}
}