import { DefaultSettingsService } from './default-settings.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  url: string;
  apikey: string;
  project: string;
  HTTPOPTIONSWORKPACKAGE;
  projects$: Observable<any>;
  formValidator: boolean;

  async testuss(apikey: string): Promise<boolean> {
    let b: boolean;
     let wpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('apikey:' + apikey)
      })};
    await this.http.get('/api/v3/projects', wpOptions).toPromise().then(() => { b = true },
      (err) => {
        b = false;
        console.log(err)
      })
    return b;
  }



  //ef8772986d022ed4ea524fcec0d889725b711b6df62f931529eac722b2fed7f7
  constructor(private http: HttpClient, private defaultSettingsService: DefaultSettingsService) {

    if (localStorage.getItem("apikey") === null || localStorage.getItem("project") === null) {
      this.defaultSettingsService.setDefaultSettings();
      location.reload();
    }

    this.HTTPOPTIONSWORKPACKAGE = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('apikey:' + this.get('apikey'))
      })
    };
    this.formValidator = true;
     

  }

  update(key: string, value: string): void {
    localStorage.setItem(key, value);
  };

  get(key: string): string {
    return localStorage.getItem(key);
  };

  getProjects(): Observable<any> {
    return this.projects$ = this.http.get('/api/v3/projects', this.HTTPOPTIONSWORKPACKAGE);
  }

  checkdefaultSettings(){
    if (localStorage.getItem("apikey") === null || localStorage.getItem("project") === null) {
      this.defaultSettingsService.setDefaultSettings();
      location.reload();
    }
  }

}
