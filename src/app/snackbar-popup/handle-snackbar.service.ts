import { WorkPackageModel } from '../work-packages/work-package.model';
import { Injectable } from '@angular/core';

@Injectable()
export class HandleSnackbarService {
  status: string;
  number: any;
  title: string;
  show: boolean;
  duration: number;

  constructor() { }

  public fillSnackbarWithContent(status: string,
    workPackage?: WorkPackageModel,
    number?: number, duration?: number) {
    this.number = number;
    this.status = status;
    this.duration = duration;
    if (workPackage) {
      this.title = workPackage.title;
    }
    this.show = true;
  }
}
