import { HandleDataService } from './services/handle-data.service';
import { BackgroundSyncService } from './background-sync.service';
import { SendDataToServerService } from './services/send-data-to-server.service';
import { HandleSnackbarService } from './send-data-snackbar/handle-snackbar.service';
import { ImgHandlingService } from './work-packages/work-package-create/img-handling.service';
import { CheckConnectionService } from './services/check-connection.service';
import { CameraComponent } from './work-packages/work-package-create/camera/camera.component';

// Layout Components
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FlexLayoutModule } from "@angular/flex-layout";

//Service Worker Components
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { UpdateAppService } from './update-app.service';

//Extern Componetns
import { TextMaskModule } from 'angular2-text-mask';

//Angular Components
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

//Custom Components
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './header/menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { WorkPackagesComponent } from './work-packages/work-packages-list/work-packages-list.component';
import { WorkPackageCreateComponent } from './work-packages/work-package-create/work-package-create.component';

//Services
import { DexieDbService } from './dexieDb/dexie-db.service';


//Directives
import { LongPressDirective } from './directives/long-press.directive';
import { UpdateSnackbarComponent } from './update-snackbar/update-snackbar.component';
import { SendDataSnackbarComponent } from './send-data-snackbar/send-data-snackbar.component';
import { WorkPackageDetailComponent } from './work-packages/work-package-detail/work-package-detail.component';
import { TimePipe } from './time.pipe';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,

    UpdateSnackbarComponent,

    MenuComponent,
    HeaderComponent,

    WorkPackagesComponent,
    WorkPackageCreateComponent,

    LongPressDirective,
    CameraComponent,
    SendDataSnackbarComponent,
    WorkPackageDetailComponent,
    TimePipe,
    DatePickerComponent,
    
  ],
  exports: [
    LongPressDirective,

  ],
  imports: [
    FlexLayoutModule,
    AngularMaterialModule,

    TextMaskModule,

    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production })
       
  ],

  providers: [DexieDbService,
    UpdateAppService, CheckConnectionService, ImgHandlingService, HandleSnackbarService, SendDataToServerService, BackgroundSyncService, HandleDataService],
  bootstrap: [AppComponent]

})
export class AppModule { }
