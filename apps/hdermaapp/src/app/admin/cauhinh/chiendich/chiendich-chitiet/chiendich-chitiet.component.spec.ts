/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChiendichChitietComponent } from './chiendich-chitiet.component';

describe('ChiendichChitietComponent', () => {
  let component: ChiendichChitietComponent;
  let fixture: ComponentFixture<ChiendichChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiendichChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiendichChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
