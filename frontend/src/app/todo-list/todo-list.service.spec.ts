import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { TodoListService } from './todo-list.service';

describe('TodoListService', () => {

  let injector: TestBed;
  let service: TodoListService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ TodoListService ]
    });
    injector = getTestBed();
    service = injector.get(TodoListService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
