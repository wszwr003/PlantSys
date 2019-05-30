import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNodeListPage } from './main-node-list.page';

describe('MainNodeListPage', () => {
  let component: MainNodeListPage;
  let fixture: ComponentFixture<MainNodeListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNodeListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNodeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
