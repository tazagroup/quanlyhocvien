import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TichdiemComponent } from './tichdiem.component';

describe('TichdiemComponent', () => {
  let component: TichdiemComponent;
  let fixture: ComponentFixture<TichdiemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TichdiemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TichdiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
