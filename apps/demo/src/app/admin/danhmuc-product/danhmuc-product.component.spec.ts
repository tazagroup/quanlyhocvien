import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucProductComponent } from './danhmuc-product.component';

describe('DanhmucProductComponent', () => {
  let component: DanhmucProductComponent;
  let fixture: ComponentFixture<DanhmucProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DanhmucProductComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DanhmucProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
