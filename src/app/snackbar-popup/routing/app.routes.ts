import { SettingsComponent } from '../../settings/settings.component';
import { WorkPackageDetailComponent } from '../../work-packages/work-package-detail/work-package-detail.component';
import { WorkPackagesComponent } from '../../work-packages/work-packages-list/work-packages-list.component';
import { Routes } from '@angular/router';
import { WorkPackageCreateComponent } from '../../work-packages/work-package-create/work-package-create.component';

export const ROUTES: Routes = [
  {path: '', component: WorkPackagesComponent},
  {path: 'work-package-create', component: WorkPackageCreateComponent},
  {path: 'work-package-list', component: WorkPackagesComponent},
  {path: 'work-package-detail', component: WorkPackageDetailComponent},
  {path: 'settings', component: SettingsComponent},
  {path: '**', redirectTo: '/'}
 
];
