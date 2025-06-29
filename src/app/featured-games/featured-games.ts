import {ChangeDetectionStrategy, Component, inject, Injector} from '@angular/core';
import {FeaturedGame} from './featured-game/featured-game';
import {Game} from '../models/game';
import {GamesService} from '../services/games.service';
import {combineLatest, map, Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {CartService} from '../cart/cart.service';
import {toObservable} from '@angular/core/rxjs-interop';
import {environment} from '../../environments/environment';
import {UserService} from '../services/user.service';

const FAKE_CLIENT_ID = environment.fakeClientId;

@Component({
  selector: 'app-featured-games',
  imports: [
    CommonModule,
    FeaturedGame
  ],
  providers: [GamesService],
  templateUrl: './featured-games.html',
  styleUrl: './featured-games.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedGames {
  private readonly injector = inject(Injector);
  private readonly gamesService = inject(GamesService);
  private readonly cartService = inject(CartService);
  private readonly userService = inject(UserService);

  readonly games$: Observable<Game[]> = combineLatest([
    this.userService.getUserDetails(FAKE_CLIENT_ID),
    this.gamesService.getFeaturedGames(),
    this.cartService.cartItems$
  ]).pipe(
    map(([user, games, cartItems]) => {
      const cartIds = new Set(cartItems.map(item => item.id));

      return games.map(game => ({
        ...game,
        inCart: cartIds.has(game.id),
        isOwned: user.ownedGames.includes(Number(game.id))
      }));
    })
  );
}
