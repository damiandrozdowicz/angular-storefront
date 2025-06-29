import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameResponse } from '../models/game';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class GamesService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getFeaturedGames(): Observable<GameResponse[]> {
    return this.http.get<GameResponse[]>(`${this.apiUrl}/featured-games`);
  }
}
