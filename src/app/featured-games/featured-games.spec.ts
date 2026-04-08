import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MockComponent, MockInstance, MockProvider } from 'ng-mocks';
import { provideHttpClient } from '@angular/common/http';
import { CartService } from '../cart/cart.service';
import { Game } from '../models/game';
import { FeaturedGames } from './featured-games';
import { GamesService } from '../services/games.service';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FeaturedGame } from './featured-game/featured-game';
import { User } from '../models/user';

const mockedGamesResponse: Game[] = [
  {
    id: 4,
    name: 'Neverwinter Nights',
    price: 7.9,
    discount: null,
    media: 'storefront-game-4.png',
    inCart: true,
    isOwned: false,
  },
  {
    id: 5,
    name: "Assassin's Creed: Director's Cut",
    price: 4.5,
    discount: 50,
    media: 'storefront-game-5.png',
    inCart: true,
    isOwned: false,
  },
];

enum ElementTestId {
  Game = 'game',
}

describe('FeaturedGames', () => {
  MockInstance.scope('case');

  it('should display featured games', fakeAsync(() => {
    const { fixture } = setup({ games: mockedGamesResponse });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const gameElements = fixture.nativeElement.querySelectorAll(
      `[data-testid=${ElementTestId.Game}]`,
    );
    expect(gameElements.length).toBe(2);
  }));

  it('should correctly mark owned games', fakeAsync(() => {
    const { component } = setup({
      games: mockedGamesResponse,
      user: { id: 1, ownedGames: [4] },
    });

    let games: Game[] = [];
    component.games$.subscribe((g) => (games = g));
    tick();

    const ownedGame = games.find((g) => g.id === 4);
    const notOwnedGame = games.find((g) => g.id === 5);

    expect(ownedGame?.isOwned).toBe(true);
    expect(notOwnedGame?.isOwned).toBe(false);
  }));

  it('should correctly mark games in the cart', fakeAsync(() => {
    const { component } = setup({
      games: mockedGamesResponse,
      cartItems: [mockedGamesResponse[1]],
    });

    let games: Game[] = [];
    component.games$.subscribe((g) => (games = g));
    tick();

    const gameInCart = games.find((g) => g.id === 5);
    const gameNotInCart = games.find((g) => g.id === 4);

    expect(gameInCart?.inCart).toBe(true);
    expect(gameNotInCart?.inCart).toBe(false);
  }));

  it('should display no games when the service returns an empty array', fakeAsync(() => {
    const { fixture } = setup({ games: [] });
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const gameElements = fixture.nativeElement.querySelectorAll(
      `[data-testid=${ElementTestId.Game}]`,
    );
    expect(gameElements.length).toBe(0);
  }));

  interface Props {
    cartItems?: Game[];
    games?: Game[];
    user?: User;
  }

  function setup(props: Props = {}): {
    fixture: ComponentFixture<FeaturedGames>;
    component: FeaturedGames;
  } {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        MockProvider(CartService, {
          cartItems$: of(props.cartItems || []),
        }),
        MockProvider(UserService, {
          getUserDetails: (id: number) =>
            of(props.user || { id, ownedGames: [] }),
        }),
      ],
    }).overrideComponent(FeaturedGames, {
      remove: { imports: [FeaturedGame], providers: [GamesService] },
      add: {
        imports: [MockComponent(FeaturedGame)],
        providers: [
          {
            provide: GamesService,
            useValue: {
              getFeaturedGames: () => of(props.games || mockedGamesResponse),
            },
          },
        ],
      },
    });

    const fixture = TestBed.createComponent(FeaturedGames);

    return {
      fixture,
      component: fixture.componentInstance,
    };
  }
});
