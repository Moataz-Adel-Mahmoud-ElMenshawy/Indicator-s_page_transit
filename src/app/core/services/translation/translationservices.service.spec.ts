import { TestBed } from '@angular/core/testing';

import { TranslationservicesService } from './translationservices.service';

describe('TranslationservicesService', () => {
  let service: TranslationservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
