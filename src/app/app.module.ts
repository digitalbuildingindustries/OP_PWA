//Routing Module
import { AppRoutingModule } from './snackbar-popup/routing/app-routing.module';
import { ROUTES } from './snackbar-popup/routing/app.routes';

// Layout Modules
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularMaterialModule } from './angular-material/angular-material.module';

//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Service Worker Components
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

//Custom Components
import { AppComponent } from './app.component';
import { MenuComponent } from './header/menu/menu.component';
import { CameraComponent } from './work-packages/work-package-create/camera/camera.component';
import { HeaderComponent } from './header/header.component';
import { WorkPackagesComponent } from './work-packages/work-packages-list/work-packages-list.component';
import { WorkPackageCreateComponent } from './work-packages/work-package-create/work-package-create.component';
import { SendDataSnackbarComponent } from './snackbar-popup/send-data-snackbar.component';
import { WorkPackageDetailComponent } from './work-packages/work-package-detail/work-package-detail.component';
import { SettingsComponent } from './settings/settings.component';

//Services
import { DexieDbService } from './dexieDb/dexie-db.service';
import { HandleDataService } from './services/handle-data.service';
import { SendDataToServerService } from './services/send-data-to-server.service';
import { HandleSnackbarService } from './snackbar-popup/handle-snackbar.service';
import { ImgHandlingService } from './work-packages/work-package-create/img-handling.service';
import { CheckConnectionService } from './services/check-connection.service';

//Pipes
import { TimePipe } from './pipes/time.pipe';


@NgModule({
  declarations: [
    AppComponent,

    MenuComponent,
    HeaderComponent,
    WorkPackagesComponent,
    WorkPackageCreateComponent,
    CameraComponent,
    SendDataSnackbarComponent,
    WorkPackageDetailComponent,
    SettingsComponent,

    TimePipe,

  ],
  exports: [

  ],
  imports: [
    FlexLayoutModule,
    AngularMaterialModule,

    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })

  ],

  providers: [DexieDbService,
    CheckConnectionService, ImgHandlingService, HandleSnackbarService,
    SendDataToServerService, HandleDataService],
  bootstrap: [AppComponent]

})
export class AppModule { }
