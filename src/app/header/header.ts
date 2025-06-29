import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Cart} from '../cart/cart';

@Component({
  selector: 'app-header',
  imports: [
    Cart
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {

}
