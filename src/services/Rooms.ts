import shortid from 'shortid';
import { Room } from '../types/Room';
import { DatabaseService } from './Db';

const RoomsRef = DatabaseService.child('rooms');

export function createRoom(roomName: string): Promise<string> {
  return RoomsRef.once('value').then((snapshot) => {
    const rooms = snapshot.val() || {};

    const id = shortid.generate();
    if (id in rooms) {
      // try a couple times?
      throw new Error('couldnt create new room b/c of id collision');
    }

    return saveNewRoom(rooms, id, roomName);
  });
}

function saveNewRoom(
  oldRooms: any,
  newRoomId: string,
  roomName: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    RoomsRef.set(
      {
        ...oldRooms,
        [newRoomId]: new Room(roomName),
      },
      (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(newRoomId);
        }
      }
    );
  });
}

function getRoomData(roomId: string) {
  return RoomsRef.child(roomId);
}

export const RoomsService = {
  createRoom,
  getRoomData,
};
