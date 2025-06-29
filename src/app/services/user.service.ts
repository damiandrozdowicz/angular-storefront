import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getUserDetails(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }
}
