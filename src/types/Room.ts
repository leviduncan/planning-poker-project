interface Player {
  flipped: boolean;
  name: string;
}

export class Room {
  flipped = false;
  players: { [key: string]: Player } | undefined = {};

  constructor(public name: string) {}
}
