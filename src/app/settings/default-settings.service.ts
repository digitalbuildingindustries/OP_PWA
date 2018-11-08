import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultSettingsService {

  constructor() { }

  setDefaultSettings(): void {
    localStorage.setItem('apikey', '5a743dbbf7889f7d54a9cc9559590bc16c04d880ed970661ab734bde5674fcd2'); //key für pwa.openproject.com
    //localStorage.setItem('apikey', '4dd0e471f9ce79ac2a0fb50811a8c36984cd0c75957b0c301eeba0ea3d173901');//key für oppwa.openproject.com
    localStorage.setItem('project', 'Hackathon');
  }

}
