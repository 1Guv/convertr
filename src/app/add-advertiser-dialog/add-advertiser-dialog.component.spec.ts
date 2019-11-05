import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdvertiserDialogComponent } from './add-advertiser-dialog.component';

describe('AddAdvertiserDialogComponent', () => {
  let component: AddAdvertiserDialogComponent;
  let fixture: ComponentFixture<AddAdvertiserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdvertiserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdvertiserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
