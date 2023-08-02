import { TestBed } from '@angular/core/testing';

import { DanhmucProductService } from './danhmuc-product.service';

describe('DanhmucProductService', () => {
  let service: DanhmucProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhmucProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
