import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { GamesService } from './games.service';
import { provideHttpClient } from '@angular/common/http';
import { GameResponse } from '../models/game';

describe('GamesService', () => {
  it('should fetch user details by userId', (done) => {
    const { service, httpMock } = setup();

    const mockedGamesResponse: GameResponse[] = [
      {
        id: 4,
        name: 'Neverwinter Nights',
        price: 7.9,
        discount: null,
        media: 'gog-game-4.png',
      },
      {
        id: 5,
        name: "Assassin's Creed: Director's Cut",
        price: 4.5,
        discount: 50,
        media: 'gog-game-5.png',
      },
    ];

    service.getFeaturedGames().subscribe((user) => {
      expect(user).toEqual(mockedGamesResponse);
      done();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/featured-games`);
    expect(req.request.method).toBe('GET');
    req.flush(mockedGamesResponse);

    httpMock.verify();
  });
});

function setup(): {
  service: GamesService;
  httpMock: HttpTestingController;
} {
  TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting(), GamesService],
  });

  const service = TestBed.inject(GamesService);
  const httpMock = TestBed.inject(HttpTestingController);

  return { service, httpMock };
}
