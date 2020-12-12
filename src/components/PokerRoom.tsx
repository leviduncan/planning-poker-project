import React, { FunctionComponent, useEffect } from 'react';
import { RoomsService } from '../services/Rooms.service';
import { DeviceData } from '../types/DeviceData.interface';
import { Room } from '../types/Room';
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
    console.log('exit room');
  }

  // ----------------------------------------
  // render
  // ----------------------------------------
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

      <div>
        <pre>{JSON.stringify(room, null, 2)}</pre>
      </div>
      <pre>{JSON.stringify(currentPlayerData, null, 2)}</pre>
    </div>
  );
};
