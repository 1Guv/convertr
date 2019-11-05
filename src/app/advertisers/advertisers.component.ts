import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Advertiser } from '../interfaces/advertiser';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { AddAdvertiserDialogComponent } from '../add-advertiser-dialog/add-advertiser-dialog.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-advertisers',
  templateUrl: './advertisers.component.html',
  styleUrls: ['./advertisers.component.scss']
})
export class AdvertisersComponent implements OnInit {

  advertisers: Advertiser[];
  displayedColumns = ['organisation', 'url', 'telephone', 'address', 'postcode'];
  dataSource: MatTableDataSource<any>;
  private destroyed = new Subject<boolean>();
  error: string;

  constructor(
    private api: ApiService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getAdvertisers();
  }

  getAdvertisers() {
    this.api.getAdvertisersAPI()
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe( response => {
        if (response.status === 200 && response.ok) {
          console.log('Advertisers', response.body);
          this.advertisers = response.body['hydra:member'];
          this.advertisers.forEach(advertiser => {
            const address = advertiser.address;
            this.getAddress(address);
          });
        }
      }, (error) => {
        this.processError(error);
      });
  }

  getAddress(address: string) {
    this.api.getAddressesAPI(address)
      .pipe(
        takeUntil(this.destroyed)
      )
      .subscribe( addressFromApi => {
        if (addressFromApi.status === 200 && addressFromApi.ok) {
          console.log('address', addressFromApi.body);
          this.advertisers.forEach(advertiser => {
            advertiser.apiAddress = addressFromApi.body;
          });
        }
      }, (error) => {
        this.processError(error);
      });
  }

  addAdvertiser() {
    console.log('addAdvertiser');
    const dialogRef = this.dialog.open(AddAdvertiserDialogComponent, {
        width: '550px'
      });
  }

  processError(error: string) {
    this.error = error;
    console.log('Error', error);
  }
}

