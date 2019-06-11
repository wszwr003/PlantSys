import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BleDetailPage } from './ble-detail.page';

describe('BleDetailPage', () => {
  let component: BleDetailPage;
  let fixture: ComponentFixture<BleDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BleDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BleDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
