export interface GameResponse {
  id: number;
  name: string;
  price: number;
  discount: number | null;
  media: string;
}

export interface Game extends GameResponse {
  inCart: boolean;
  isOwned: boolean;
}
