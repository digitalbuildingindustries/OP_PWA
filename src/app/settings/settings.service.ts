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

  constructor(private http: HttpClient) {
    if (localStorage.getItem("apikey") === null || localStorage.getItem("project") === null) {
      localStorage.setItem('apikey', '5a743dbbf7889f7d54a9cc9559590bc16c04d880ed970661ab734bde5674fcd2');
      localStorage.setItem('project', 'testprojekt');
    }
    this.HTTPOPTIONSWORKPACKAGE = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('apikey:' + this.get('apikey'))
      })
    };
  }
  update(key: string, value: string) {
    localStorage.setItem(key, value);
  };

  get(key: string): string {
    return localStorage.getItem(key);
  };

  getProjects() {
    return this.projects$ = this.http.get('/api/v3/projects', this.HTTPOPTIONSWORKPACKAGE);
  }

}
