/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HinhanhService } from './hinhanh.service';

describe('Service: Hinhanh', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HinhanhService]
    });
  });

  it('should ...', inject([HinhanhService], (service: HinhanhService) => {
    expect(service).toBeTruthy();
  }));
});
