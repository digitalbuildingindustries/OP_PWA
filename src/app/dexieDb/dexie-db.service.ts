import { allWorkPackageDb } from './allWorkPackageDb';
import { WorkPackageDb } from './WorkPackageDb'
import { WorkPackageModel } from '../work-packages/work-package.model';
import { Injectable } from '@angular/core';

@Injectable()
export class DexieDbService {

  public StorageAll: WorkPackageModel[];
  //Work packages not yet send, because of no internet connection
  public WpToSendDb: WorkPackageDb;
  //Work packages, that are already sent
  public allWpDb: allWorkPackageDb;

  constructor() {
    this.StorageAll = [];
    this.WpToSendDb = new WorkPackageDb();
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
    await this.WpToSendDb.delete().then(() =>
      this.WpToSendDb.open()
    );
  }

  //Delete by Index 
  async clearStorageDataByIndex(key: any, db: any) {
    if (db.name == "WorkpackagesAll") {
      await db.workpackagesAll.where('id').equals(key).delete();
    }
    else {
      await this.WpToSendDb.workpackages.where('id').equals(key).delete();
    }
  }

  // READ STATUS
  async getStorageStatus(): Promise<number> {
    this.StorageAll = await this.WpToSendDb.workpackages.toArray();
    return this.StorageAll.length;
  }

}
