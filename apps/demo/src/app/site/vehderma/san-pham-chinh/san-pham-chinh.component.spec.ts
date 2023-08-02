import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanPhamChinhComponent } from './san-pham-chinh.component';

describe('SanPhamChinhComponent', () => {
  let component: SanPhamChinhComponent;
  let fixture: ComponentFixture<SanPhamChinhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanPhamChinhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SanPhamChinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
