import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaildanhmucComponent } from './detaildanhmuc.component';

describe('DetaildanhmucComponent', () => {
  let component: DetaildanhmucComponent;
  let fixture: ComponentFixture<DetaildanhmucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetaildanhmucComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetaildanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
