import { Player } from './Player';
import * as stats from 'stats-lite';

export type RoomPlayers = { [key: string]: Player };
export class Room {
  flipped = false;
  players: RoomPlayers;

  constructor(
    public name: string,
    firstPlayerUsername: string,
    firstPlayerName: string
  ) {
    this.players = { [firstPlayerUsername]: new Player(firstPlayerName) };
  }
}

export function calculateRoomMode(players: RoomPlayers): string {
  const values = Object.entries(players)
    .map(([_key, players]) => players)
    .filter((player) => player.flipped)
    .map((player) => Number(player.value));

  if (values.length === 0) {
    return '';
  }

  return stats.mode(values).toString();
}

export function calculateRoomMean(players: RoomPlayers): string {
  const values = Object.entries(players)
    .map(([_key, players]) => players)
    .filter((player) => player.flipped)
    .map((player) => Number(player.value));

  if (values.length === 0) {
    return '';
  }

  return stats.mean(values).toString();
}
