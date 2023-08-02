/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CauhinhapiComponent } from './cauhinhapi.component';

describe('CauhinhapiComponent', () => {
  let component: CauhinhapiComponent;
  let fixture: ComponentFixture<CauhinhapiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CauhinhapiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CauhinhapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
