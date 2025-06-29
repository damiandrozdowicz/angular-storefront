import { Injectable, signal } from '@angular/core';
import { Game } from '../models/game';
import { Observable } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _cartItems = signal<Game[]>([]);

  get cartItems() {
    return this._cartItems;
  }

  get cartItems$(): Observable<Game[]> {
    return toObservable(this._cartItems);
  }

  clearCart(): void {
    this._cartItems.set([]);
  }

  addToCart(item: Game): void {
    if (this.isGameInCart(item)) return;
    this._cartItems.update((cartItems) => [...cartItems, item]);
  }

  removeFromCart(item: Game): void {
    this._cartItems.update((cartItems) =>
      cartItems.filter((itemInCart) => itemInCart.id !== item.id),
    );
  }

  private isGameInCart(game: Game): boolean {
    return this.cartItems().some((cartItem) => {
      return cartItem.id === game.id;
    });
  }
}
