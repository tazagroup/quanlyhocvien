import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsanphamComponent } from './detailsanpham.component';

describe('DetailsanphamComponent', () => {
  let component: DetailsanphamComponent;
  let fixture: ComponentFixture<DetailsanphamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsanphamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
