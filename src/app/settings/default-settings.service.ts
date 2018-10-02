import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultSettingsService {

  constructor() { }

  setDefaultSettings(): void {
    localStorage.setItem('apikey', '5a743dbbf7889f7d54a9cc9559590bc16c04d880ed970661ab734bde5674fcd2');
    localStorage.setItem('project', 'testprojekt');
  }

}
