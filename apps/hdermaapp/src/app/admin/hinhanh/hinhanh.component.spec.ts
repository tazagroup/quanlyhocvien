/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HinhanhComponent } from './hinhanh.component';

describe('HinhanhComponent', () => {
  let component: HinhanhComponent;
  let fixture: ComponentFixture<HinhanhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HinhanhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HinhanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
