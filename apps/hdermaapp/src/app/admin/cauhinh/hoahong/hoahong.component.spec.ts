import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoahongComponent } from './hoahong.component';

describe('HoahongComponent', () => {
  let component: HoahongComponent;
  let fixture: ComponentFixture<HoahongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoahongComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HoahongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
