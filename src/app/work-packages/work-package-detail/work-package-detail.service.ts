import { async } from '@angular/core/testing';
import { DexieDbService } from './../../dexieDb/dexie-db.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WorkPackageModel } from './../work-package.model';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkPackageDetailService {
  readonly APIKEY;
  readonly HTTPOPTIONSWORKPACKAGE;
  URL;
  ATTACHMENTURL;
  public title: string;
  public description: string;
  attachmentCount: number;
  fileDoesntExistAnymore: boolean;
  workpackageDetail$: Observable<any>;
  wp$: Observable<any>;
  workpackageAttachment$: Observable<any>;
  wpSubject: BehaviorSubject<any>;

  constructor(public http: HttpClient, public dexieDbService: DexieDbService) {

   // this.URL = '/api/v3/projects/testprojekt/work_packages';
    this.URL = '/api/v3/projects/testprojekt/work_packages';
   
    this.APIKEY = 'a9d666f4557626f82eae71a2e286a1b19890a55a9aeff50c61b88c99e0afd23c';
    this.HTTPOPTIONSWORKPACKAGE = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('apikey:' + this.APIKEY)
      })
    };
    this.fileDoesntExistAnymore = false;
  }

  b: any;
  async getWorkPackage(wp: WorkPackageModel) {
    this.title = '';
    this.description = '';
    this.b = '';
    this.URL = '/api/v3/work_packages/' + wp.id;
    this.ATTACHMENTURL = '/api/v3/work_packages/' + wp.id + '/attachments';
    //this.ATTACHMENTURL = 'api/v3/work_packages/attachments/4/Image_0.jpeg"';
    this.wpSubject = new BehaviorSubject<any>(wp);
    this.wp$ = Observable.of(wp);

    /*     let v = this.http.get(this.URL, this.HTTPOPTIONSWORKPACKAGE)
          .subscribe(e => {
            console.log("getWorkpackage http call in workPackageDetailService" + e);
            this.b = e;
            this.title = this.b.subject;
            this.description = this.b.description.raw;
            this.updateIndexedDb(this.b).then((e) => {
            })
          })*/
    this.workpackageDetail$ = this.http.get(this.URL, this.HTTPOPTIONSWORKPACKAGE);
    this.workpackageAttachment$ = this.http.get(this.ATTACHMENTURL, this.HTTPOPTIONSWORKPACKAGE);
  }
//.subscribe((result) => { console.log(result) })
  async deleteFileFromIndexedDb(id: number) {
    await this.dexieDbService.clearStorageDataByIndex(id, this.dexieDbService.allWpDb);
   // console.log("DELETE " + id);
  };

  async saveFileInIndexedDb (wp: WorkPackageModel){
    await this.dexieDbService.saveStorage(wp, this.dexieDbService.allWpDb);
  }

  async updateIndexedDb(wp: WorkPackageModel) {
    await this.dexieDbService.getStorageDataByIndex(this.dexieDbService.allWpDb, this.b.id).then((e) => {
      let v = e;
      if (v.title === wp.title && v.description === wp.description) {
        //     console.log("Server Side title: " + wp.title);
        //    console.log("IndexedDb Title: " + v.title);
        return false;
      }
      else {
        return false;
      }
    });

  }

}
