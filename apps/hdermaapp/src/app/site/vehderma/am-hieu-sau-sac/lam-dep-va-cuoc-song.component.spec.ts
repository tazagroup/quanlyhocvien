import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LamDepVaCuocSongComponent } from './lam-dep-va-cuoc-song.component';

describe('LamDepVaCuocSongComponent', () => {
  let component: LamDepVaCuocSongComponent;
  let fixture: ComponentFixture<LamDepVaCuocSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LamDepVaCuocSongComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LamDepVaCuocSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
