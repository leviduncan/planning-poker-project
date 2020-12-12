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
  const history = useHistory();

  // ----------------------------------------
  // effects
  // ----------------------------------------
  useEffect(() => {
    RoomsService.addRoomPlayer(roomId, deviceData.userId, deviceData.name);
  }, [roomId, deviceData]);

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  function handleExit() {
    history.push('/');
  }

  function handleRemovePlayer(userId: string) {
    RoomsService.removeRoomPlayer(roomId, userId);
  }

  function handlePointSubmit(selectedPoints: string) {
    RoomsService.updateRoomPlayer(roomId, deviceData.userId, {
      value: selectedPoints,
      flipped: false,
    });
  }

  function handleFlipAllCards() {
    RoomsService.flipAllRoomCards(roomId, room);
  }

  function handleResetCards() {
    RoomsService.resetAllRoomCards(roomId, room);
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
      <div className="mb-2">
        <PointPickerForm
          onSubmit={handlePointSubmit}
          onExit={handleExit}
        ></PointPickerForm>
      </div>
      <div className="mb-3 text-center">
        <button
          type="button"
          className="btn btn-success mr-3"
          onClick={handleFlipAllCards}
        >
          Flip all cards
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleResetCards}
        >
          Reset
        </button>
      </div>

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

      {/* <pre>{JSON.stringify(room, null, 2)}</pre> */}
    </div>
  );
};
