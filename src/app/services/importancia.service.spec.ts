import { TestBed, inject } from '@angular/core/testing';

import { ImportanciaService } from './importancia.service';

describe('ImportanciaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImportanciaService]
    });
  });

  it('should be created', inject([ImportanciaService], (service: ImportanciaService) => {
    expect(service).toBeTruthy();
  }));
});
