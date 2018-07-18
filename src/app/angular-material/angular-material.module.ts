import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule, MatTabsModule,
  MatFormField, MatFormFieldModule, MatOptionModule,
  MatSelectModule, MatToolbar, MatToolbarModule, MatInputModule, MatListModule, MatButtonToggleModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule

} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';



@NgModule({
  imports: [

  ],
  exports: [CommonModule,
    MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule, MatTabsModule, MatInputModule,
    MatFormFieldModule, MatOptionModule, MatSelectModule, MatToolbarModule, MatButtonToggleModule,
    BrowserAnimationsModule, MatSelectModule, MatSnackBarModule, CdkTableModule, MatProgressSpinnerModule, MatExpansionModule,
    MatListModule, MatDatepickerModule, MatNativeDateModule, MatMomentDateModule],
  declarations: [],
  providers: []
})
export class AngularMaterialModule { }
