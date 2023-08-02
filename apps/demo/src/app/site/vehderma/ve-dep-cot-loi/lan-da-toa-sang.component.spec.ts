import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanDaToaSangComponent } from './lan-da-toa-sang.component';

describe('LanDaToaSangComponent', () => {
  let component: LanDaToaSangComponent;
  let fixture: ComponentFixture<LanDaToaSangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanDaToaSangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanDaToaSangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
