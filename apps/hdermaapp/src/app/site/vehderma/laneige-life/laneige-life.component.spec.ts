import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaneigeLifeComponent } from './laneige-life.component';

describe('LaneigeLifeComponent', () => {
  let component: LaneigeLifeComponent;
  let fixture: ComponentFixture<LaneigeLifeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaneigeLifeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaneigeLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
