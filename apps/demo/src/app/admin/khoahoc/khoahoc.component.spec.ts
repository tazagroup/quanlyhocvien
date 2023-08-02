import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoahocComponent } from './khoahoc.component';

describe('KhoahocComponent', () => {
  let component: KhoahocComponent;
  let fixture: ComponentFixture<KhoahocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KhoahocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KhoahocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
