/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SeotoolChitietComponent } from './seotool-chitiet.component';

describe('SeotoolChitietComponent', () => {
  let component: SeotoolChitietComponent;
  let fixture: ComponentFixture<SeotoolChitietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeotoolChitietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeotoolChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
