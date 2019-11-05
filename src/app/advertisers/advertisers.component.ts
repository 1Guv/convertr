import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Advertiser } from '../interfaces/advertiser';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import { AddAdvertiserDialogComponent } from '../add-advertiser-dialog/add-advertiser-dialog.component';

@Component({
  selector: 'app-advertisers',
  templateUrl: './advertisers.component.html',
  styleUrls: ['./advertisers.component.scss']
})
export class AdvertisersComponent implements OnInit {

  advertisers: Advertiser[];
  displayedColumns = ['organisation', 'url', 'telephone', 'address', 'postcode'];
  dataSource: MatTableDataSource<any>;

  constructor(
    private api: ApiService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getAdvertisers();
  }

  getAdvertisers() {
    this.api.getAdvertisersAPI()
      .subscribe( response => {
        console.log('Advertisers', response.body);
        this.advertisers = response.body['hydra:member'];
        this.advertisers.forEach(advertiser => {
          const address = advertiser.address;
          this.getAddress(address);
        });
      });
  }

  getAddress(address: string) {
    this.api.getAddressesAPI(address)
    .subscribe( addressFromApi => {
      console.log('address', addressFromApi.body);
      this.advertisers.forEach(advertiser => {
        advertiser.apiAddress = addressFromApi.body;
      });
    });
  }

  addAdvertiser() {
    console.log('addAdvertiser');
    const dialogRef = this.dialog.open(AddAdvertiserDialogComponent, {
        width: '550px'
      });
  }
}

