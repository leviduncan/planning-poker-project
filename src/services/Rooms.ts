import shortid from 'shortid';
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
        [newRoomId]: { name: roomName },
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

export const RoomsService = {
  createRoom,
};
