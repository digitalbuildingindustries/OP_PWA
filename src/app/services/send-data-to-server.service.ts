import { ImgHandlingService } from './../work-packages/work-package-create/img-handling.service';
import { Dexie } from 'dexie';
import { WorkPackageModel } from './../work-packages/work-package.model';
import { HandleSnackbarService } from './../send-data-snackbar/handle-snackbar.service';
import { DexieDbService } from '../dexieDb/dexie-db.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class SendDataToServerService {

  workpackageCount: number;
  workpackage: WorkPackageModel;
  workpackages: WorkPackageModel[];
  readonly URL;
  readonly APIKEY;
  readonly HTTPOPTIONSWORKPACKAGE;
  public attachmentURL;
  public priorityUrl;
  public debugS: any;
  public allowTosendData: boolean;
  public numberOfWorkpackages;
  public attachmentCount;

  constructor(public dexieService: DexieDbService, public handleSnackbarService: HandleSnackbarService,
    public router: Router, public http: HttpClient, public imgHandlingService: ImgHandlingService) {

    this.allowTosendData = true;
    this.numberOfWorkpackages = 0;
    this.attachmentCount = 0;
    this.workpackageCount = 0;
    // this.URL = '/api/v3/projects/testprojekt/work_packages';
    this.URL = '/api/v3/projects/testprojekt/work_packages';
    this.APIKEY = 'e6b6b786880e4f38296bd8fc1e9323bf7b257fa637680b967e5fa443b3213b80';


    //API DOCKER INSZANCE
    //this.APIKEY = '8aaa0be4c1e320bd2b07232b5d35d1d3cbedbd5158152cec2e20e602d4c2a04e';
    this.workpackages = [];
    this.HTTPOPTIONSWORKPACKAGE = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('apikey:' + this.APIKEY),
        //"Cache-Control":"no-cache",
        // 'Content-Type' : 'text/plain'
        // 'Content-Type' : 'application/json'
        //'Content-Type' : 'application/x-www-form-urlencoded'
        //  'Content-Type': 'multipart/form-data'
        // 'Access-Control-Allow-Origin' : "*",
        //'Access-Control-Allow-Credentials' : 'true'
        // 'Content-Type': 'application/json; charset=utf-8'
        // 'Access-Control-Max-Age': '100'
      })
    };
  }

  //4. send Attachment
  async sendA(url: any, img: any, imageNumber?: number) {
      this.attachmentURL = url;
    
      if(imageNumber){
        this.attachmentCount = imageNumber;
      }
    var formData = new FormData();
    if (img) {
      for (let element of img) {
        var blobFile = new Blob([this.b64ToUint8Array(element)], { type: 'text/html' });
        // var blobFile = new Blob([element], { type: 'text/html' });
        formData.append('file', blobFile, 'file');
        formData.append('metadata', JSON.stringify({ 'fileName': 'Image_' + this.attachmentCount + this.guessImageMime(element) }));
        this.attachmentCount++;
        await this.http.post<any>(this.attachmentURL, formData, this.HTTPOPTIONSWORKPACKAGE).toPromise().then(data => {
          //    console.log('4.sendA: ' + this.attachmentCount)               
        });
      };
    }
  }

  //3. send WP
  async sendW(wpToSend: any) {
    let a;
    try {
      /*       var formDat = new FormData();
            formDat.append('subject', 'file');
            return this.http.post<any>(this.URL, formDat, this.HTTPOPTIONSWORKPACKAGE).toPromise().then(data => { */
      return this.http.post<WorkPackageModel>(this.URL, wpToSend, this.HTTPOPTIONSWORKPACKAGE).toPromise().then(data => {
        console.log(data),
          a = data,
          // this.priorityUrl = a._links.priority.href;
          this.attachmentURL = a._links.addAttachment.href,
          this.attachmentCount = 0;
        console.log("NEUE ID: " + a.id)
        console.log(a);
        let w = {
          'id': a.id,
          'title': this.workpackage.title,
          'sent': true
        };
        this.dexieService.saveStorage(w, this.dexieService.allWpDb).then((e) => console.log(e));
      });
    }
    catch (e) {
    }
  }

  /*   async sendPriority() {
      console.log("PRIO URL: " + this.priorityUrl);
      let t = { 'title': 'Low' }
      return this.http.post<any>(this.priorityUrl, t, this.HTTPOPTIONSWORKPACKAGE).toPromise().then(data => { console.log(data) })
    } */

  //1. prepare
  async prepareWorkpackagesToSend(workpackage?: WorkPackageModel) {
    if (workpackage) {
      this.workpackages[0] = workpackage;
      this.workpackageCount = this.workpackages.length;
      this.send();
    }
    else {
      //get workpackage & refresh workpackagecount
      await this.dexieService.getStorageData(this.dexieService.db).then((e) => {
        this.workpackages = e,
          this.workpackageCount = this.workpackages.length;
        //console.log("Darf gesendet werden: " + this.allowTosendData)
        if (this.allowTosendData == true) {
          this.send();
          this.allowTosendData = false;
        }
      })
    }
  }

  //2. send
  async send() {
    if (this.workpackageCount > 0) {
      for (let element of this.workpackages) {
        this.numberOfWorkpackages++;
        this.workpackage = element;
        let wpToSend = {
          'subject': this.workpackage.title,
          'description': { 'raw': this.workpackage.description }
        };
        try {

          await this.sendW(wpToSend);
          //  await this.sendPriority();
          await this.sendA(this.attachmentURL, this.workpackage.img).then(() => {
            // console.log("attachments sent?");
            //   console.log("5. after sendw " + element.title);
            if (this.workpackageCount > 0) {
              this.workpackageCount--;
            }
            //  console.log("WP COUNT: " + this.workpackageCount);
            if (this.workpackageCount == 0) {
              this.setSnackbarContent();
            }
            this.dexieService.clearStorageDataByIndex(this.workpackage.id, this.dexieService.db).then(() => {
              console.log("6. Try to delete stuff" + wpToSend.subject);
            })
          });
        }
        catch (exception) {
          console.log(exception);
        }
      }
    }
    this.dexieService.getStorageStatus().then((e) => {
      if (e == 0) {
        this.allowTosendData = true;
      }
      else {
        this.allowTosendData = false;
      }
    });
  };

  setSnackbarContent() {
    // console.log("SET SNACKBAR CONTENT")
    if (this.numberOfWorkpackages > 1) {
      this.handleSnackbarService.fillSnackbarWithContent('wpsSent', null, null, this.numberOfWorkpackages);
    }
    if (this.numberOfWorkpackages == 1) {
      this.handleSnackbarService.fillSnackbarWithContent('wpSent', this.workpackage, null, 1);
    }
    this.numberOfWorkpackages = 0;
    // this.router.navigate(['/work-package-create']);
    this.router.navigate(['/work-package-list']);
    //   window.location.reload();
  };

  // Check Img Format
  guessImageMime(data) {
    if (data.charAt(11) == 'j') {
      return ".jpeg";
    } else if (data.charAt(11) == 'g') {
      return ".gif";
    } else if (data.charAt(11) == 'p') {
      return ".png";
    }
  }

  // Convert Img Format
  b64ToUint8Array(b64Image) {
    var img = atob(b64Image.split(',')[1]);
    var img_buffer = [];
    var i = 0;
    while (i < img.length) {
      img_buffer.push(img.charCodeAt(i));
      i++;
    }
    return new Uint8Array(img_buffer);
  }
}


/* CURL COMMAND THAT WORKS */
/**
 * curl -u apikey:29e9935eb191f45bade150afc74d158915a014bcef13adec81088f36efdab9e5 -H "Content-Type: multipart/form-data" -F "metadata={\"fileName\":\"test.png\"};type=application/json" -F "file=@C:\Users\linof\Desktop\code.png;type=image/png;filename=testus.png" -X POST http://192.168.99.100:8080/api/v3/work_packages/8/attachments

 curl -u apikey:cb8340925e4d75e4cb4d96d25765324744c40f19d968ca0c63cdd467daf2a545 -H "Content-Type: multipart/form-data" -F "metadata={\"fileName\":\"test.png\"};type=application/json" -F "file=@C:\Users\linof\Desktop\code.png;type=image/png;filename=testus.png" -X POST https://lino.openproject.com/api/v3/work_packages/8/attachments

 //DOCKER
 // docker run -it -p 8080:80 -e SECRET_KEY_BASE=secret openproject/community:7

 ng serve -o --proxy-config proxy.config.json

 ng serve --host 192.168.1.157 --proxy-config proxy.config.json

taskkill /im node.exe
*/
