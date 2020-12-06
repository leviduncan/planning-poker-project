import shortid from 'shortid';
import { Player } from '../types/Player';
import { Room } from '../types/Room';
import { DatabaseService } from './Db.service';
import { DeviceDataService } from './DeviceData.service';

const RoomsRef = DatabaseService.child('rooms');

function createRoom(roomName: string): Promise<string> {
  return RoomsRef.once('value').then((snapshot) => {
    const rooms = snapshot.val() || {};

    const roomId = shortid.generate();
    if (roomId in rooms) {
      // try a couple times?
      throw new Error('couldnt create new room b/c of id collision');
    }

    const player = DeviceDataService.getDeviceData();
    if (!player) {
      throw new Error('player not defined');
    }

    RoomsRef.child(roomId).set(new Room(roomName));

    return roomId;
  });
}

function getRoomData(roomId: string) {
  return RoomsRef.child(roomId);
}

function getRoomPlayersRef(roomId: string) {
  return getRoomData(roomId).child('players');
}

function addRoomPlayer(roomId: string, username: string) {
  getRoomPlayersRef(roomId).child(username).set(new Player(username));
}

function updateRoomPlayer(roomId: string, username: string, player: Player) {
  getRoomPlayersRef(roomId).child(username).set(player);
}

function deleteRoomPlayer(roomId: string, username: string) {
  getRoomPlayersRef(roomId).child(username).remove();
}

export const RoomsService = {
  createRoom,
  getRoomData,
  getRoomPlayersRef,
  addRoomPlayer,
  updateRoomPlayer,
  deleteRoomPlayer,
};
