import {ChangeDetectionStrategy, Component, inject, input} from '@angular/core';
import {Game} from '../../models/game';
import {CurrencyPipe} from '@angular/common';
import {CartService} from '../../cart/cart.service';

@Component({
  selector: 'app-featured-game',
  imports: [CurrencyPipe],
  templateUrl: './featured-game.html',
  styleUrl: './featured-game.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturedGame {
  readonly game = input.required<Game>();
  private readonly cartService = inject(CartService);

  addToCart() {
    this.cartService.addToCart(this.game())
  }
}
