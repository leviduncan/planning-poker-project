import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoomsService } from '../services/Rooms.service';
import { DeviceData } from '../types/DeviceData.interface';
import { Room } from '../types/Room';
import { PlayerCard } from './PlayerCard';

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
        RoomsService.addRoomPlayer(
          roomId,
          deviceData.username,
          deviceData.name
        );
      }
    }
  }, [roomId, room, deviceData]);

  // ----------------------------------------
  // helper functions
  // ----------------------------------------

  function removePlayer(a: any) {
    console.log('remove player =', a);
  }

  // ----------------------------------------
  // render
  // ----------------------------------------
  if (room === null) {
    return <div>Loading...</div>;
  } else if (room === 'invalid') {
    return <div>Room not found</div>;
  } else {
    return (
      <div>
        <div>You're in poker room: {roomId}</div>
        <pre>{JSON.stringify(room, null, 4)}</pre>
        <div className="row">
          {Object.keys(room.players).map((playerKey) => (
            <PlayerCard
              username={playerKey}
              currentUser={deviceData.username}
              player={room.players[playerKey]}
              onRemovePlayer={removePlayer}
            ></PlayerCard>
          ))}
        </div>
      </div>
    );
  }
};
