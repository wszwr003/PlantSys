import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoContrlPage } from './auto-contrl.page';

describe('AutoContrlPage', () => {
  let component: AutoContrlPage;
  let fixture: ComponentFixture<AutoContrlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoContrlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoContrlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
