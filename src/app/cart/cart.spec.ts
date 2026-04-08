import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MockInstance, MockProvider } from 'ng-mocks';
import { Cart } from './cart';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { CartService } from '../cart/cart.service';
import { Game } from '../models/game';
import { getElementByTestId } from '../utils/test.utils';

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
  CartTotal = 'cart-total',
  CartStatus = 'cart-status',
  CartItemPrice = 'cart-item-price',
  CartEmpty = 'cart-empty-status',
  ClearCartButton = 'clear-cart-button',
  CartToggle = 'shopping-cart-toggle',
  CartItemImage = 'cart-item-image',
  RemoveItemFromCartButton = 'remove-item-button',
  CartItem = 'cart-item',
  CartItemName = 'cart-item-name',
}

describe('Cart', () => {
  MockInstance.scope('case');

  it('should display correct total in shopping cart toggle', () => {
    const { fixture } = setup({ cartItems: mockedGamesResponse });
    const toggle = getElementByTestId(fixture, ElementTestId.CartToggle);
    expect(toggle).toBeTruthy();
    expect(toggle!.textContent?.trim()).toContain('2');
  });

  it('should display an empty cart', () => {
    const { fixture } = setup({ cartItems: [] });
    const cartEmptyEl = getElementByTestId(fixture, ElementTestId.CartEmpty);
    expect(cartEmptyEl).toBeTruthy();
  });

  it('should display all cart items', () => {
    const { fixture } = setup({ cartItems: mockedGamesResponse });
    const items = fixture.debugElement.nativeElement.querySelectorAll(
      `[data-testid=${ElementTestId.CartItem}]`,
    );
    expect(items.length).toBe(2);
  });

  it('should display the correct cart total', () => {
    const { fixture } = setup({ cartItems: mockedGamesResponse });
    const total = getElementByTestId(
      fixture,
      ElementTestId.CartTotal,
    )?.textContent?.trim();
    expect(total).toContain('12.40');
  });

  it('should show the correct number of items in the cart status', () => {
    const { fixture } = setup({ cartItems: mockedGamesResponse });
    const status = getElementByTestId(
      fixture,
      ElementTestId.CartStatus,
    )?.textContent?.trim();
    expect(status).toContain('2 Items in Cart');
  });

  it('should call clearCart when the clear cart button is clicked', () => {
    const clearItemsSpy = MockInstance(
      CartService,
      'clearCart',
      jasmine.createSpy('clearCart'),
    );

    const { fixture } = setup({ cartItems: mockedGamesResponse });

    const clearBtn = getElementByTestId(fixture, ElementTestId.ClearCartButton);
    clearBtn!.click();

    fixture.detectChanges();

    expect(clearItemsSpy).toHaveBeenCalled();
  });

  it('should display correct image src and alt text for an item', () => {
    const { fixture } = setup({ cartItems: mockedGamesResponse });

    const images = fixture.debugElement.nativeElement.querySelectorAll(
      `[data-testid=${ElementTestId.CartItemImage}]`,
    );
    expect(images[0].getAttribute('src')).toBe('storefront-game-4.png');
    expect(images[0].getAttribute('alt')).toBe(
      'Cover art of Neverwinter Nights',
    );
  });

  it('should still display items correctly even if discount is null or zero', () => {
    const cartItems = [
      { ...mockedGamesResponse[0], discount: null },
      { ...mockedGamesResponse[1], discount: 0 },
    ];

    const { fixture } = setup({ cartItems });
    const items = fixture.debugElement.nativeElement.querySelectorAll(
      `[data-testid=${ElementTestId.CartItem}]`,
    );
    expect(items.length).toBe(2);
  });

  it('should display zero price correctly if item price is 0', () => {
    const zeroPriceItem: Game = {
      id: 6,
      name: 'Free Game',
      price: 0,
      discount: null,
      media: 'free-game.png',
      inCart: true,
      isOwned: false,
    };

    const { fixture } = setup({ cartItems: [zeroPriceItem] });
    const price = getElementByTestId(
      fixture,
      ElementTestId.CartItemPrice,
    )?.textContent?.trim();
    expect(price).toContain('0.00');
  });

  it('should calculate total price based on raw item prices (ignoring discounts)', () => {
    const discountedItem: Game = {
      id: 7,
      name: 'Discounted Game',
      price: 10,
      discount: 50,
      media: 'discounted-game.png',
      inCart: true,
      isOwned: false,
    };

    const { fixture } = setup({ cartItems: [discountedItem] });
    const total = getElementByTestId(
      fixture,
      ElementTestId.CartTotal,
    )?.textContent?.trim();
    expect(total).toContain('10.00');
  });

  it('should display the correct cart item names', () => {
    const { fixture } = setup({ cartItems: mockedGamesResponse });
    const names = fixture.debugElement.nativeElement.querySelectorAll(
      `[data-testid=${ElementTestId.CartItemName}]`,
    );
    expect(names.length).toBe(2);
    expect(names[0].textContent?.trim()).toBe('Neverwinter Nights');
    expect(names[1].textContent?.trim()).toBe(
      "Assassin's Creed: Director's Cut",
    );
  });

  it('should remove a single item when clicking its remove button', () => {
    const removeFromCartSpy = MockInstance(
      CartService,
      'removeFromCart',
      jasmine.createSpy('removeFromCart'),
    );
    const { fixture } = setup({ cartItems: mockedGamesResponse });

    const removeButtons = fixture.debugElement.nativeElement.querySelectorAll(
      `[data-testid=${ElementTestId.RemoveItemFromCartButton}]`,
    );
    expect(removeButtons.length).toBe(2);

    removeButtons[0].click();
    fixture.detectChanges();

    expect(removeFromCartSpy).toHaveBeenCalled();
  });

  interface Props {
    cartItems?: Game[];
  }

  function setup(props?: Props): {
    fixture: ComponentFixture<Cart>;
    component: Cart;
  } {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        MockProvider(HttpClient),
        MockProvider(CartService, {
          cartItems: signal(props?.cartItems || []),
        }),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(Cart);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    return { fixture, component };
  }
});
