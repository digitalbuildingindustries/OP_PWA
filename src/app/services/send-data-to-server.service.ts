import { SettingsService } from '../settings/settings.service';
import { WorkPackageModel } from '../work-packages/work-package.model';
import { HandleSnackbarService } from '../snackbar-popup/handle-snackbar.service';
import { DexieDbService } from '../dexieDb/dexie-db.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class SendDataToServerService {

  public workpackageCount: number;
  public workpackage: WorkPackageModel;
  public workpackages: WorkPackageModel[];
  private URL;
  private readonly APIKEY;
  private readonly HTTPOPTIONSWORKPACKAGE;
  public attachmentURL;
  public priorityUrl;
  public debugS: any;
  public allowTosendData: boolean;
  public numberOfWorkpackages;
  public attachmentCount;

  constructor(private dexieService: DexieDbService, private handleSnackbarService: HandleSnackbarService,
    private router: Router, private http: HttpClient, private settingsService: SettingsService) {

    if (localStorage.getItem("apikey") === null || localStorage.getItem("project") === null) {
      localStorage.setItem('apikey', '5a743dbbf7889f7d54a9cc9559590bc16c04d880ed970661ab734bde5674fcd2'); //key für pwa.openproject.com
     // localStorage.setItem('apikey', '4dd0e471f9ce79ac2a0fb50811a8c36984cd0c75957b0c301eeba0ea3d173901'); //key für oppwa.openproject
      localStorage.setItem('project', 'testprojekt');
    }

    this.allowTosendData = true;
    this.numberOfWorkpackages = 0;
    this.attachmentCount = 0;
    this.workpackageCount = 0;
    this.URL = '/api/v3/projects/' + this.settingsService.get('project') + '/work_packages';
    this.APIKEY = this.settingsService.get('apikey');
    this.workpackages = [];
    this.HTTPOPTIONSWORKPACKAGE = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('apikey:' + this.APIKEY),
      })
    };

  }

  //4. send Attachment
  async sendA(url: any, img: any, imageNumber?: number) {
    this.attachmentURL = url;
    if (imageNumber) {
      this.attachmentCount = imageNumber;
    }
    var formData = new FormData();
    if (img) {
      for (let element of img) {
        // var blobFile = new Blob([this.b64ToUint8Array(element)], { type: 'text/html' });
        var blobFile = new Blob([this.b64ToUint8Array(element)], { type: 'img/' + this.guessImageMime(element) });
        // var blobFile = new Blob([element], { type: 'img/html' });
        formData.append('file', blobFile, 'file');
        formData.append('metadata', JSON.stringify({ 'fileName': 'Image_' + this.attachmentCount + "." + this.guessImageMime(element) }));
        this.attachmentCount++;
        await this.http.post<any>(this.attachmentURL, formData, this.HTTPOPTIONSWORKPACKAGE).toPromise().then(data => {
        });
      };
    }
  }

  //3. send WP
  async sendW(wpToSend: any) {
    this.URL = '/api/v3/projects/' + this.settingsService.get('project') + '/work_packages';
    let a;
    try {
      return this.http.post<WorkPackageModel>(this.URL, wpToSend, this.HTTPOPTIONSWORKPACKAGE).toPromise().then(data => {
        a = data,
          this.attachmentURL = a._links.addAttachment.href,
          this.attachmentCount = 0;
        let w = {
          'id': a.id,
          'title': this.workpackage.title,
          'sent': true,
          'project': this.workpackage.project
        };
        this.dexieService.saveStorage(w, this.dexieService.allWpDb);
      });
    }
    catch (e) {
    }
  }

  //1. prepare
  async prepareWorkpackagesToSend(workpackage?: WorkPackageModel) {
    if (workpackage) {
      this.workpackages[0] = workpackage;
      this.workpackageCount = this.workpackages.length;
      this.send();
    }
    else {
      //get workpackage & refresh workpackagecount
      await this.dexieService.getStorageData(this.dexieService.WpToSendDb).then((e) => {
        this.workpackages = e,
          this.workpackageCount = this.workpackages.length;
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
          'description': { 'raw': this.workpackage.description },
          'estimatedTime': this.workpackage.estimatedTime,
          'remainingTime': this.workpackage.remainingHours,
          'percentageDone': this.workpackage.percentageDone,
          'startDate': this.workpackage.startDate,
          'dueDate': this.workpackage.dueDate
        };
        try {
          await this.sendW(wpToSend);
          await this.sendA(this.attachmentURL, this.workpackage.img).then(() => {
            if (this.workpackageCount > 0) {
              this.workpackageCount--;
            }
            if (this.workpackageCount == 0) {
              this.setSnackbarContent();
            }
            this.dexieService.clearStorageDataByIndex(this.workpackage.id, this.dexieService.WpToSendDb).then(() => {
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
    if (this.numberOfWorkpackages > 1) {
      this.handleSnackbarService.fillSnackbarWithContent('wpsSent', null, null, this.numberOfWorkpackages);
    }
    if (this.numberOfWorkpackages == 1) {
      this.handleSnackbarService.fillSnackbarWithContent('wpSent', this.workpackage, null);
    }
    this.numberOfWorkpackages = 0;
    if (this.router.url === "/") {
      setTimeout(() => {
        location.reload();
      },
        2000);

    } else {
      this.router.navigate(['/']);
    }
  };

  // Check Img Format
  guessImageMime(data) {
    if (data.charAt(11) == 'j') {
      return "jpeg";
    } else if (data.charAt(11) == 'g') {
      return "gif";
    } else if (data.charAt(11) == 'p') {
      return "png";
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
