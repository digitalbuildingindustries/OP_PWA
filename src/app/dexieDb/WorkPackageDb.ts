import { WorkPackageModel } from '../work-packages/work-package.model';
import Dexie from "dexie";

export class WorkPackageDb extends Dexie {
    workpackages: Dexie.Table<WorkPackageModel, string>;
 constructor() {
   super("Workpackages");
   this.version(1).stores({
     workpackages: 'id'
   });
 }
}

