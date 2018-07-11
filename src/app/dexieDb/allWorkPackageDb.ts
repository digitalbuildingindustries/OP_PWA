import { WorkPackageModel } from '../work-packages/work-package.model';
import Dexie from "dexie";

export class allWorkPackageDb extends Dexie {
    workpackagesAll: Dexie.Table<WorkPackageModel, string>;
 constructor() {
   super("WorkpackagesAll");
   this.version(1).stores({
     workpackagesAll: 'id'
   });
 }
}

