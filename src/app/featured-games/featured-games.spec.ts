import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {MockInstance, MockProvider} from 'ng-mocks';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {CartService} from '../cart/cart.service';
import {Game} from '../models/game';
import {FeaturedGames} from './featured-games';
import {GamesService} from '../services/games.service';
import {UserService} from '../services/user.service';
import {of} from 'rxjs';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {signal} from '@angular/core';

const mockedGamesResponse: Game[] = [
  {
    id: 4,
    name: "Neverwinter Nights",
    price: 7.9,
    discount: null,
    media: "gog-game-4.png",
    inCart: true,
    isOwned: false,
  },
  {
    id: 5,
    name: "Assassin's Creed: Director's Cut",
    price: 4.50,
    discount: 50,
    media: "gog-game-5.png",
    inCart: true,
    isOwned: false,
  }
];

enum ElementTestId {
  Game = 'game',
}

describe('Cart', () => {
  MockInstance.scope('case');

  it('should display featured games based on cart and ownership', fakeAsync(() => {
    const {fixture} = setup({cartItems: mockedGamesResponse});

    tick(1000); // in case there's any async delay (though here it's all `of(...)`)
    fixture.detectChanges();

    const gameElements = fixture.nativeElement.querySelectorAll('[data-testid="game"]');
    expect(gameElements.length).toBe(2);
  }));

  interface Props {
    cartItems?: Game[];
  }

  function setup(props?: Props): {
    fixture: ComponentFixture<FeaturedGames>,
    component: FeaturedGames,
  } {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        MockProvider(HttpClient),
        MockProvider(CartService, {
          cartItems$: of(props?.cartItems || []),
          cartItems: signal(props?.cartItems || []),
        }),
        MockProvider(GamesService, {
          getFeaturedGames: () => of(mockedGamesResponse)
        }),
        MockProvider(UserService, {
          getUserDetails: () => of({
            ownedGames: [1],
            id: 1
          })
        }),
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(FeaturedGames);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    return {fixture, component};
  }
});
