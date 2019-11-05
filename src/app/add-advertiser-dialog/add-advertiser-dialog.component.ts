import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-advertiser-dialog',
  templateUrl: './add-advertiser-dialog.component.html',
  styleUrls: ['./add-advertiser-dialog.component.scss']
})
export class AddAdvertiserDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddAdvertiserDialogComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
