// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProjectManagerService } from './projectmanager.service';

describe('ProjectManagerService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ProjectManagerService]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ProjectManagerService], (service: ProjectManagerService) => {
    expect(service).toBeTruthy();
  }));
});
