import React from 'react';
import { render, screen } from '@testing-library/react';
import { PokerRoom } from './PokerRoom';
import { Room } from '../types/Room';
import { Player } from '../types/Player';
import { RoomsService } from '../services/Rooms.service';

describe('remove a user', () => {
  test('you cant remove yourself', () => {
    const deviceData = { name: 'AJ', userId: 'playerA' };
    const roomId = 'abc';
    const room = new Room('test room', 'AJ_123', 'AJ');
    const me = new Player('playerA');
    const myUserId = 'playerA';
    const playerB = new Player('playerB');

    room.players = {
      [myUserId]: me,
      playerB: playerB,
    };
    render(
      <PokerRoom
        roomId={roomId}
        room={room}
        deviceData={deviceData}
      ></PokerRoom>
    );

    RoomsService.removeRoomPlayer = jest.fn();

    const [playerAButton, _playerBButton] = screen.queryAllByText('✕');
    playerAButton.click();
    expect(RoomsService.removeRoomPlayer).not.toHaveBeenCalledWith(
      myUserId,
      me.name
    );
  });

  test('but you can remove someone else', () => {
    const deviceData = { name: 'AJ', userId: 'playerA' };
    const roomId = 'abc';
    const room = new Room('test room', 'AJ_123', 'AJ');
    const me = new Player('playerA');
    const myUserId = 'playerA';
    const playerB = new Player('playerB');
    const playerBId = 'playerB';
    room.players = {
      [myUserId]: me,
      [playerBId]: playerB,
    };

    render(
      <PokerRoom
        roomId={roomId}
        room={room}
        deviceData={deviceData}
      ></PokerRoom>
    );

    RoomsService.removeRoomPlayer = jest.fn();

    const [_playerAButton, playerBButton] = screen.queryAllByText('✕');
    playerBButton.click();

    expect(RoomsService.removeRoomPlayer).toHaveBeenCalledWith(
      roomId,
      playerBId
    );
  });
});
