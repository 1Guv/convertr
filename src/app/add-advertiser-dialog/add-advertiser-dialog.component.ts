import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AdvertiserClass } from '../classes/advertiser';
import { AddressClass } from '../classes/address';
import { v4 as uuid } from 'uuid';
import { ApiService } from '../services/api.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-advertiser-dialog',
  templateUrl: './add-advertiser-dialog.component.html',
  styleUrls: ['./add-advertiser-dialog.component.scss']
})
export class AddAdvertiserDialogComponent implements OnInit {

  advertisersFormGroup: FormGroup;
  advertiser = new AdvertiserClass();
  address = new AddressClass();
  uniqueID: string;
  error: string;
  private destroyed = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<AddAdvertiserDialogComponent>,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.advertisersFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      orgurl: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postcode: ['', Validators.required],
    });
    this.uniqueID = uuid();
  }

  createAdvertiser(form: NgForm) {
    const saveAdvertiser = () => {
      this.advertiser.name = form.value.name;
      this.advertiser.orgurl = form.value.orgurl;
      this.advertiser.firstName = form.value.firstName;
      this.advertiser.lastName = form.value.lastName;
      this.advertiser.email = form.value.email;
      this.advertiser.telephone = form.value.telephone;
      this.advertiser.address = `/addresses/${this.uniqueID}`;
      this.advertiser.idUrl = this.advertiser.address;

      this.address.address = form.value.address;
      this.address.city = form.value.city;
      this.address.postcode = form.value.postcode;

      // console.log('Advertiser:', this.advertiser);
      // console.log('Address:', this.address);

      this.api.postAdvertiserAPI(this.advertiser)
        .pipe(
          takeUntil(this.destroyed)
        ).subscribe((response: any) => {
          if (response.status === 200 && response.ok) {
            this.createAddressForAdvertiser();
          } else {
            this.error = response.error.message;
          }
        });
    };

    const processError = () => {
      console.log('Form Error:', form.errors);
    };

    // Starts here
    form.status === 'VALID' ? saveAdvertiser() : processError();

  }

  async createAddressForAdvertiser() {
    this.api.postAddressAPI(this.address)
        .pipe(
          takeUntil(this.destroyed)
        ).subscribe((response: any) => {
          if (response.status === 200 && response.ok) {
            console.log('completed');
          } else {
            this.error = response.error.message;
          }
        });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
