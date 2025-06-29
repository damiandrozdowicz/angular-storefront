import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  const mockGame1 = {
    id: 3,
    name: 'The Settlers 2: Gold Edition',
    price: 5.9,
    discount: null,
    media: 'gog-game-3.png',
    inCart: false,
    isOwned: false,
  };
  const mockGame2 = {
    id: 4,
    name: 'Neverwinter Nights',
    price: 7.9,
    discount: null,
    media: 'gog-game-4.png',
    inCart: false,
    isOwned: false,
  };

  const mockGame3 = {
    id: 5,
    name: "Assassin's Creed: Director's Cut",
    price: 4.5,
    discount: 50,
    media: 'gog-game-5.png',
    inCart: false,
    isOwned: false,
  };

  it('should be able to add to cart', () => {
    const { service } = setup();

    service.addToCart(mockGame1);

    expect(service.cartItems()).toEqual([mockGame1]);
  });

  it('should be able to add multiple to cart', () => {
    const { service } = setup();

    service.addToCart(mockGame1);
    service.addToCart(mockGame2);
    service.addToCart(mockGame3);

    expect(service.cartItems()).toEqual([mockGame1, mockGame2, mockGame3]);
  });

  it('should not be able to add the same game twice', () => {
    const { service } = setup();

    service.addToCart(mockGame1);
    service.addToCart(mockGame2);
    service.addToCart(mockGame2);

    expect(service.cartItems()).toEqual([mockGame1, mockGame2]);
  });

  it('should be able to remove game', () => {
    const { service } = setup();

    service.addToCart(mockGame1);
    service.addToCart(mockGame2);

    service.removeFromCart(mockGame1);

    expect(service.cartItems()).toEqual([mockGame2]);
  });

  it('should be able clear all games at once', () => {
    const { service } = setup();

    service.addToCart(mockGame1);
    service.addToCart(mockGame2);

    service.clearCart();

    expect(service.cartItems()).toEqual([]);
  });
});

function setup(): {
  service: CartService;
} {
  TestBed.configureTestingModule({
    providers: [CartService],
  });

  const service = TestBed.inject(CartService);

  return { service };
}
