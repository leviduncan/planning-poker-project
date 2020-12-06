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

    const deviceData = DeviceDataService.getDeviceData();
    if (!deviceData) {
      throw new Error('deviceData not defined');
    }

    return new Promise((resolve, reject) => {
      RoomsRef.child(roomId).set(
        new Room(roomName, deviceData.username, deviceData.name),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(roomId);
          }
        }
      );
    });
  });
}

function getRoomRef(roomId: string) {
  return RoomsRef.child(roomId);
}

function getRoomPlayersRef(roomId: string) {
  return getRoomRef(roomId).child('players');
}

function addRoomPlayer(roomId: string, username: string, name: string) {
  getRoomPlayersRef(roomId).child(username).set(new Player(name));
}

function updateRoomPlayer(roomId: string, username: string, player: Player) {
  getRoomPlayersRef(roomId).child(username).set(player);
}

function deleteRoomPlayer(roomId: string, username: string) {
  getRoomPlayersRef(roomId).child(username).remove();
}

export const RoomsService = {
  createRoom,
  getRoomRef,
  getRoomPlayersRef,
  addRoomPlayer,
  updateRoomPlayer,
  deleteRoomPlayer,
};
