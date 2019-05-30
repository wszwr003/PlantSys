import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirContrlPage } from './air-contrl.page';

describe('AirContrlPage', () => {
  let component: AirContrlPage;
  let fixture: ComponentFixture<AirContrlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirContrlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirContrlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
