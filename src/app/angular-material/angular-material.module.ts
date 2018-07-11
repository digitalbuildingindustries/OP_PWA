import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule, MatTabsModule,
  MatFormField, MatFormFieldModule, MatOptionModule,
  MatSelectModule, MatToolbar, MatToolbarModule, MatInputModule, MatListModule, MatButtonToggleModule,
  MatSnackBarModule,
  MatProgressSpinnerModule

} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';



@NgModule({
  imports: [

  ],
  exports: [CommonModule,
    MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatTableModule, MatTabsModule, MatInputModule,
    MatFormFieldModule, MatOptionModule, MatSelectModule, MatToolbarModule, MatButtonToggleModule,
    BrowserAnimationsModule, MatSelectModule, MatSnackBarModule, CdkTableModule, MatProgressSpinnerModule,
    MatListModule],
  declarations: [],
  providers: []
})
export class AngularMaterialModule { }
