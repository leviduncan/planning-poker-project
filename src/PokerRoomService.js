import db from './db';

export class PokerRoomService {
  roomId;
  room;
  players;
  flipped;

  constructor(roomId) {
    this.roomId = roomId;
    this.room = db.child(roomId);
    this.players = db.child(roomId).child('players');
    this.flipped = db.child(roomId).child('flipped');
  }
}
