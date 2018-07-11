import { allWorkPackageDb } from './allWorkPackageDb';
import { WorkPackageDb } from './WorkPackageDb'
import { WorkPackageModel } from '../work-packages/work-package.model';
import { CameraComponent } from '../work-packages/work-package-create/camera/camera.component';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable()
export class DexieDbService {
  public StorageAll: WorkPackageModel[];
  result: any;
  public db: WorkPackageDb;
  public allWpDb: allWorkPackageDb;

  constructor() {

    this.StorageAll = [];
    this.db = new WorkPackageDb();
    this.allWpDb = new allWorkPackageDb();
  }

  //TODO: Snackbar for QuotaExceeded Error

  // Create new
  async saveStorage(w: WorkPackageModel, db: any) {

    if (db.name == "Workpackages") {
      db.workpackages.put(w).then(result => {
        // Success
      }).catch('QuotaExceededError', e => {
        // Failed with QuotaExceededError
        console.error("QuotaExceeded error: " + e.message);
      }).catch(Error, e => {
        // Any other error derived from standard Error
        console.error("Error: " + e.message);
      }).catch(e => {
        // Other error such as a string was thrown
        console.error(e);
      });
    }
    if (db.name == "WorkpackagesAll") {
      db.workpackagesAll.put(w).then(result => {
        // Success
      }).catch('QuotaExceededError', e => {
        // Failed with QuotaExceededError
        console.error("QuotaExceeded error: " + e.message);
      }).catch(Error, e => {
        // Any other error derived from standard Error
        console.error("Error: " + e.message);
      }).catch(e => {
        // Other error such as a string was thrown
        console.error(e);
      });
    }
  }


  //READ ALL
  async getStorageData(db: any): Promise<WorkPackageModel[]> {
    if (db.name == "Workpackages") {
      this.StorageAll = await db.workpackages.toArray();
    }
    if (db.name == "WorkpackagesAll") {
      this.StorageAll = await db.workpackagesAll.toArray();
    }
    return this.StorageAll;
  }

  //READ by Index
  async getStorageDataByIndex(db: any, id: number) {
    if (db.name == "WorkpackagesAll") {
      let value = await db.workpackagesAll.get({ id: id });
      return value;
    }
  }

  //DELETE ALL
  async clearStorageData() {
    this.StorageAll = [];
    await this.db.delete().then(() =>
      this.db.open()
      //this.db.close(),
      //  console.log("deleted")
    );
  }

  //Delete by Index 
  async clearStorageDataByIndex(key: any, db: any) {
    if (db.name == "WorkpackagesAll") {
      console.log("in richtiger if")
      await db.workpackagesAll.where('id').equals(key).delete();
    }
    else {
      await this.db.workpackages.where('id').equals(key).delete();
    }
  }

  // READ STATUS
  async getStorageStatus(): Promise<number> {
    // return this.StorageAll.length;
    this.StorageAll = await this.db.workpackages.toArray();
    return this.StorageAll.length;
  }

}

//                    <--------------------------------------------------- LOCAL STORAGE IMPLEMENTATION ------------------------------->
/*   //Delete
    clearLocalStorageData() {
      localStorage.clear();
      console.log("localStorage cleared");
      this.count = 0;
    } */
    //Create
  /*   save(w: WorkPackageModel) {
      localStorage.setItem(this.count, JSON.stringify(w));
      this.count++;
    } */

  /*   //Delete
    clearLocalStorageData() {
      localStorage.clear();
      console.log("localStorage cleared");
      this.count = 0;
    } */

  /*   //Read status
    getLocalStorageStatus(): number {
      let count = 0;
      for (var i = 0; i < 40; i++) {
        if (JSON.parse(localStorage.getItem(JSON.stringify(i))) != null) {
          count++;
        }
      }
      return count;
    } 
     //Read Key      
  getactualKey() {
    for (let i = 0; i < 40; i++) {
      if (!localStorage.getItem(JSON.stringify(i))) {
        return i;
      }
    }
  }
    
    */
