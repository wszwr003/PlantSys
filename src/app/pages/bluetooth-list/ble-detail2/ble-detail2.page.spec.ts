import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BleDetail2Page } from './ble-detail2.page';

describe('BleDetail2Page', () => {
  let component: BleDetail2Page;
  let fixture: ComponentFixture<BleDetail2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BleDetail2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BleDetail2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
