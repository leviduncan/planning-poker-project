import { Player } from './Player';
export class Room {
  flipped = false;
  players: { [key: string]: Player };

  constructor(
    public name: string,
    firstPlayerUsername: string,
    firstPlayerName: string
  ) {
    this.players = { [firstPlayerUsername]: new Player(firstPlayerName) };
  }
}
