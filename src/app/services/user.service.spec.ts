import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';

describe('UserService', () => {
  it('should fetch user details by userId', (done) => {
    const { service, httpMock } = setup();

    const mockUser: User = {
      id: 1,
      ownedGames: [2, 3],
    };

    service.getUserDetails(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);

    httpMock.verify();
  });
});

function setup(): {
  service: UserService;
  httpMock: HttpTestingController;
} {
  TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting(), UserService],
  });

  const service = TestBed.inject(UserService);
  const httpMock = TestBed.inject(HttpTestingController);

  return { service, httpMock };
}
