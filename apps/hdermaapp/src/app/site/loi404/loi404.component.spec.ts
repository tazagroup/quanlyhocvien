import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loi404Component } from './loi404.component';

describe('Loi404Component', () => {
  let component: Loi404Component;
  let fixture: ComponentFixture<Loi404Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Loi404Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Loi404Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
