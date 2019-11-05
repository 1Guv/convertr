import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AdvertiserClass } from '../classes/advertiser';
import { AddressClass } from '../classes/address';

@Component({
  selector: 'app-add-advertiser-dialog',
  templateUrl: './add-advertiser-dialog.component.html',
  styleUrls: ['./add-advertiser-dialog.component.scss']
})
export class AddAdvertiserDialogComponent implements OnInit {

  advertisersFormGroup: FormGroup;
  advertiser = new AdvertiserClass();
  address = new AddressClass();

  constructor(
    public dialogRef: MatDialogRef<AddAdvertiserDialogComponent>,
    private formBuilder: FormBuilder
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
  }

  createAdvertiser(form: NgForm) {
    console.log('form', form);
    console.log('form value', form.value);

    const saveAdvertiser = () => {
      this.advertiser.name = form.value.name;
      this.advertiser.orgurl = form.value.orgurl;
      this.advertiser.firstName = form.value.firstName;
      this.advertiser.lastName = form.value.lastName;
      this.advertiser.email = form.value.email;
      this.advertiser.telephone = form.value.telephone;

      this.address.address = form.value.address;
      this.address.city = form.value.city;
      this.address.postcode = form.value.postcode;

      console.log('Advertiser:', this.advertiser);
      console.log('Address:', this.address);
    };

    const processError = () => {
      console.log('Form Error:', form.errors);
    };

    form.status === 'VALID' ? saveAdvertiser() : processError();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
