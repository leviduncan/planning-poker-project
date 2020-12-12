import React, { FunctionComponent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RoomsService } from '../services/Rooms.service';
import { DeviceData } from '../types/DeviceData.interface';
import { Room } from '../types/Room';
import { PlayerCard } from './PlayerCard';
import { PointPickerForm } from './PointPickerForm';

export const PokerRoom: FunctionComponent<{
  roomId: string;
  room: Room;
  deviceData: DeviceData;
}> = ({ roomId, room, deviceData }) => {
  // ----------------------------------------
  // constants
  // ----------------------------------------
  const currentPlayerData = room.players[deviceData.userId];
  const history = useHistory();

  // ----------------------------------------
  // effects
  // ----------------------------------------
  useEffect(() => {
    RoomsService.addRoomPlayer(roomId, deviceData.userId, deviceData.name);
  }, [roomId, room, deviceData]);

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  function handlePointSubmit(selectedPoints: string) {
    console.log('submitted', selectedPoints);
  }

  function handleExit() {
    history.push('/');
  }

  function handleRemovePlayer(userId: string) {
    RoomsService.removeRoomPlayer(roomId, userId);
  }

  // ----------------------------------------
  // render
  // ----------------------------------------
  const sortedPlayers = Object.entries(room.players).sort(([a], [b]) => {
    if (a === deviceData.userId) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <div>
      <div>
        <strong>You're in room:</strong> {room.name}
      </div>
      <div className="mb-2">
        <strong>Room Id:</strong> {roomId}
      </div>
      <PointPickerForm
        onSubmit={handlePointSubmit}
        onExit={handleExit}
      ></PointPickerForm>

      <div className="row">
        {sortedPlayers.map(([userId, player]) => (
          <PlayerCard
            key={userId}
            userId={userId}
            currentUser={deviceData.userId}
            player={player}
            onRemovePlayer={handleRemovePlayer}
          ></PlayerCard>
        ))}
      </div>

      <div>
        <pre>{JSON.stringify(room, null, 2)}</pre>
      </div>
      <pre>{JSON.stringify(currentPlayerData, null, 2)}</pre>
    </div>
  );
};
