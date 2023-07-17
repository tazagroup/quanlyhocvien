import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaivietChitietComponent } from './baiviet-chitiet.component';

describe('BaivietChitietComponent', () => {
  let component: BaivietChitietComponent;
  let fixture: ComponentFixture<BaivietChitietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaivietChitietComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaivietChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
