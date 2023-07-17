import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucDetailComponent } from './danhmuc-detail.component';

describe('DanhmucDetailComponent', () => {
  let component: DanhmucDetailComponent;
  let fixture: ComponentFixture<DanhmucDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DanhmucDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DanhmucDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
