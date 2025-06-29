import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MockInstance, MockProvider } from 'ng-mocks';

import { FeaturedGame } from './featured-game';
import { getElementByTestId } from '../../utils/test.utils';
import { CartService } from '../../cart/cart.service';
import { Game } from '../../models/game';

enum ElementTestId {
  Thumbnail = 'thumbnail',
  Title = 'title',
  DiscountLabel = 'discount',
  OwnedLabel = 'owned',
  InCartLabel = 'in-cart',
  PriceLabel = 'price',
}

describe('FeaturedGame - template integrity', () => {
  it('should render title', () => {
    const { fixture } = setup();
    expect(getElementByTestId(fixture, ElementTestId.Title)).toBeTruthy();
  });

  it('should render thumbnail', () => {
    const { fixture } = setup();
    expect(getElementByTestId(fixture, ElementTestId.Thumbnail)).toBeTruthy();
  });

  it('should render discount label', () => {
    const { fixture } = setup();
    expect(
      getElementByTestId(fixture, ElementTestId.DiscountLabel),
    ).toBeTruthy();
  });

  it('should render owned label', () => {
    const { fixture } = setup({
      game: {
        id: 1,
        name: 'Test Game',
        price: 9.99,
        discount: 0.2,
        isOwned: true,
        inCart: false,
        media: 'test-game-thumbnail.jpg',
      },
    });
    expect(getElementByTestId(fixture, ElementTestId.OwnedLabel)).toBeTruthy();
  });

  it('should render price label', () => {
    const { fixture } = setup({
      game: {
        id: 1,
        name: 'Test Game',
        price: 9.99,
        discount: 0.2,
        isOwned: false,
        inCart: false,
        media: 'test-game-thumbnail.jpg',
      },
    });
    expect(getElementByTestId(fixture, ElementTestId.PriceLabel)).toBeTruthy();
  });

  it('should render in cart label', () => {
    const { fixture } = setup();
    expect(getElementByTestId(fixture, ElementTestId.InCartLabel)).toBeTruthy();
  });
});

describe('Interaction with CartService', () => {
  it('should add game to cart', () => {
    const gameMock = {
      id: 1,
      name: 'Test Game',
      price: 9.99,
      discount: 0.2,
      isOwned: false,
      inCart: false,
      media: 'test-game-thumbnail.jpg',
    };
    const addToCartSpy = MockInstance(
      CartService,
      'addToCart',
      jasmine.createSpy('addToCart'),
    );
    const { fixture } = setup({
      game: gameMock,
    });

    const priceEl = getElementByTestId(fixture, ElementTestId.PriceLabel);

    priceEl!.click();
    fixture.detectChanges();

    expect(addToCartSpy).toHaveBeenCalledWith(gameMock);
  });
});

interface Props {
  game: Game;
}

function setup(props?: Partial<Props>): {
  fixture: ComponentFixture<FeaturedGame>;
  component: FeaturedGame;
} {
  TestBed.configureTestingModule({
    imports: [CommonModule],
    providers: [
      MockProvider(HttpClient),
      MockProvider(CartService, {
        addToCart: jasmine.createSpy(),
      }),
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(FeaturedGame);
  const component = fixture.componentInstance;

  fixture.componentRef.setInput(
    'game',
    props?.game || {
      id: 1,
      name: 'Test Game',
      price: 9.99,
      discount: 0.2,
      isOwned: false,
      inCart: true,
      media: 'test-game-thumbnail.jpg',
    },
  );

  fixture.detectChanges();

  return {
    fixture,
    component,
  };
}
