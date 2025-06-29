import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from './hero/hero';
import { Header } from './header/header';
import { FeaturedGames } from './featured-games/featured-games';

@Component({
  selector: 'app-root',
  imports: [Hero, Header, FeaturedGames],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
