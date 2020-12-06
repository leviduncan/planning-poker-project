import { FunctionComponent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RoomsService } from '../services/Rooms.service';
import { DeviceData } from '../types/DeviceData.interface';
import { Room } from '../types/Room';

type RoomStates = Room | null | 'invalid';
function isRoomValid(room: RoomStates): room is Room {
  return room !== null && room !== 'invalid';
}

export const PokerRoom: FunctionComponent<{ deviceData: DeviceData }> = ({
  deviceData,
}) => {
  // ----------------------------------------
  // state
  // ----------------------------------------
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<RoomStates>(null);

  // subscribe to room updates
  useEffect(() => {
    RoomsService.getRoomData(roomId).on('value', (snapshot) => {
      const newRoom = snapshot.val();
      if (!newRoom) {
        return setRoom('invalid');
      }
      setRoom(newRoom);
    });
  }, [roomId]);

  // subscribe to room player and room flip updates
  // when the players or flipped values are changes, it does not trigger an update on rooms
  useEffect(() => {
    RoomsService.getRoomPlayersRef(roomId).on('value', (snapshot) => {
      setRoom((room) => {
        if (isRoomValid(room)) {
          return { ...room, players: snapshot.val() };
        }
        return room;
      });
    });
  }, [roomId]);

  // add player if not already in room
  useEffect(() => {
    if (isRoomValid(room)) {
      const players = room.players || {};
      if (!(deviceData.username in players)) {
        RoomsService.addRoomPlayer(roomId, deviceData.username);
      }
    }
  }, [roomId, room, deviceData]);

  // ----------------------------------------
  // helper functions
  // ----------------------------------------

  // ----------------------------------------
  // render
  // ----------------------------------------

  switch (room) {
    case null:
      return <div>Loading...</div>;
    case 'invlaid':
      return (
        <div>
          <div>Room not found</div>
          <div>
            <Link to="/">Home</Link>
          </div>
        </div>
      );
    default:
      return (
        <div>
          <div>You're in poker room: {roomId}</div>
          <pre>{JSON.stringify(room, null, 4)}</pre>
        </div>
      );
  }
};
