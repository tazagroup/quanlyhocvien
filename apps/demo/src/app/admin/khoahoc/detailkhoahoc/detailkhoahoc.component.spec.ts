import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailkhoahocComponent } from './detailkhoahoc.component';

describe('DetailkhoahocComponent', () => {
  let component: DetailkhoahocComponent;
  let fixture: ComponentFixture<DetailkhoahocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailkhoahocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailkhoahocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
