/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HocvienChitietComponent } from './hocvien-chitiet.component';

describe('HocvienChitietComponent', () => {
  let component: HocvienChitietComponent;
  let fixture: ComponentFixture<HocvienChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HocvienChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HocvienChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
