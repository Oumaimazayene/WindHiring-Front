import { TestBed } from '@angular/core/testing';

import { TestSectionLogiqueServiceService } from './test-section-logique-service.service';

describe('TestSectionLogiqueServiceService', () => {
  let service: TestSectionLogiqueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestSectionLogiqueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
