import { Observable } from 'rxjs';
import { WorkPackageModel } from '../work-packages/work-package.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable()
export class HandleSnackbarService {
  status: string;
  number: any;
  title: string;
  show: boolean;
  duration: number;

  constructor() { }
  fillSnackbarWithContent(status: string, workPackage?: WorkPackageModel,
    workPackges?: WorkPackageModel[], number?: number, duration?: number) {
    this.number = number;
    this.status = status;
    this.duration = duration;
    if (workPackage){
      this.title = workPackage.title;
    }
/*     if (workPackges) {
      this.number = number;
      return;
    }
    if (workPackage) {
      this.number = 1;
      this.title = workPackage.title;
    }
    if (status) {
      this.status = true;
    }
    else {
      this.status = false;
    } */
    this.show = true;
  }
}
