import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehdermaComponent } from './vehderma.component';

describe('VehdermaComponent', () => {
  let component: VehdermaComponent;
  let fixture: ComponentFixture<VehdermaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehdermaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VehdermaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
