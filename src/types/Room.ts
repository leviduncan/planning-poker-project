import { Player } from './Player';
export class Room {
  flipped = false;
  players: { [key: string]: Player } | undefined = {};

  constructor(public name: string) {}
}
