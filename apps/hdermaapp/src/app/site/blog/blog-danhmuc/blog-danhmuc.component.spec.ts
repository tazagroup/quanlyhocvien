import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDanhmucComponent } from './blog-danhmuc.component';

describe('BlogDanhmucComponent', () => {
  let component: BlogDanhmucComponent;
  let fixture: ComponentFixture<BlogDanhmucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogDanhmucComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogDanhmucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
