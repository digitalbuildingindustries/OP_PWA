// Code from https://gist.github.com/b12f/cbcdeda645f13f26ee504e4be5a1e26f

import {Directive, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({
  selector: '[long-press]'
})
export class LongPressDirective {
  private touchTimeout: any;
  @Output() longpress = new EventEmitter();

  private rootPage: any;

  constructor() {}

  @HostListener('touchstart') touchstart():void {
    this.touchTimeout = setTimeout(() => {
        this.longpress.emit({});
    }, 600);
  }

  @HostListener('touchend') touchend():void {
      this.touchEnd();
  }
  @HostListener('touchcancel') touchcancel():void {
      this.touchEnd();
  }

  private touchEnd():void {
    clearTimeout(this.touchTimeout);
  }
}