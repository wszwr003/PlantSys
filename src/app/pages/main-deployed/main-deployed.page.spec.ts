import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDeployedPage } from './main-deployed.page';

describe('MainDeployedPage', () => {
  let component: MainDeployedPage;
  let fixture: ComponentFixture<MainDeployedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDeployedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDeployedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
