import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirCollectPage } from './air-collect.page';

describe('AirCollectPage', () => {
  let component: AirCollectPage;
  let fixture: ComponentFixture<AirCollectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirCollectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirCollectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
