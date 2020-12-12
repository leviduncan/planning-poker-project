import React, { FunctionComponent, useEffect } from 'react';
import { RoomsService } from '../services/Rooms.service';
import { DeviceData } from '../types/DeviceData.interface';
import { Room } from '../types/Room';

export const PokerRoom: FunctionComponent<{
  roomId: string;
  room: Room;
  deviceData: DeviceData;
}> = ({ roomId, room, deviceData }) => {
  // ----------------------------------------
  // effects
  // ----------------------------------------
  useEffect(() => {
    RoomsService.addRoomPlayer(roomId, deviceData.userId, deviceData.name);
  }, [roomId, room, deviceData]);

  // ----------------------------------------
  // helper functions
  // ----------------------------------------

  // ----------------------------------------
  // render
  // ----------------------------------------
  return <div>PokserRoom works</div>;
};
