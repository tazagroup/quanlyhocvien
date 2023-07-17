import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaivietDanhmucComponent } from './baiviet-danhmuc.component';

describe('BaivietDanhmucComponent', () => {
  let component: BaivietDanhmucComponent;
  let fixture: ComponentFixture<BaivietDanhmucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaivietDanhmucComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaivietDanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
