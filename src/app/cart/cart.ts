import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CartService } from './cart.service';
import { CurrencyPipe } from '@angular/common';
import { Game } from '../models/game';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  private cartService = inject(CartService);
  readonly cartItems = this.cartService.cartItems;

  readonly totalItemsQty = computed(() => this.cartItems().length);
  readonly cartItemsTotal = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.price, 0),
  );

  handleClearCart(): void {
    this.cartService.clearCart();
  }

  handleRemoveItem(game: Game): void {
    this.cartService.removeFromCart(game);
  }
}
