import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucProductDetailComponent } from './danhmuc-product-detail.component';

describe('DanhmucProductDetailComponent', () => {
  let component: DanhmucProductDetailComponent;
  let fixture: ComponentFixture<DanhmucProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DanhmucProductDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DanhmucProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
