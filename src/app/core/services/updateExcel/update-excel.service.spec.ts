import { TestBed } from '@angular/core/testing';

import { UpdateExcelService } from './update-excel.service';

describe('UpdateExcelService', () => {
  let service: UpdateExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
