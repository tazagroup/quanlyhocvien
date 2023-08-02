import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracuudonComponent } from './tracuudon.component';

describe('TracuudonComponent', () => {
  let component: TracuudonComponent;
  let fixture: ComponentFixture<TracuudonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TracuudonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TracuudonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
