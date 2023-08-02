import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoiquaComponent } from './doiqua.component';

describe('DoiquaComponent', () => {
  let component: DoiquaComponent;
  let fixture: ComponentFixture<DoiquaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoiquaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DoiquaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
