import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiendichComponent } from './chiendich.component';

describe('ChiendichComponent', () => {
  let component: ChiendichComponent;
  let fixture: ComponentFixture<ChiendichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChiendichComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChiendichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
