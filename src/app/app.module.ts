import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdvertisersComponent } from './advertisers/advertisers.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule, MatIconModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule } from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { AddAdvertiserDialogComponent } from './add-advertiser-dialog/add-advertiser-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdvertisersComponent,
    AddAdvertiserDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  entryComponents: [AddAdvertiserDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
