import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadianceComponent } from './radiance.component';

describe('RadianceComponent', () => {
  let component: RadianceComponent;
  let fixture: ComponentFixture<RadianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RadianceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
