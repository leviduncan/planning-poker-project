import { calculateRoomMean, calculateRoomMode, RoomPlayers } from './Room';

describe('calculateRoomMode', () => {
  test('it calculates the mode', () => {
    const players: RoomPlayers = {
      playerA: {
        name: 'playerA',
        value: '1',
        flipped: true,
      },
      playerB: {
        name: 'playerB',
        value: '1',
        flipped: true,
      },
      playerC: {
        name: 'playerC',
        value: '2',
        flipped: true,
      },
    };

    expect(calculateRoomMode(players)).toEqual('1');
  });

  test('it calculates the mode of only flipped players', () => {
    const players: RoomPlayers = {
      playerA: {
        name: 'playerA',
        value: '1',
        flipped: false,
      },
      playerB: {
        name: 'playerB',
        value: '1',
        flipped: false,
      },
      playerC: {
        name: 'playerC',
        value: '2',
        flipped: true,
      },
    };

    expect(calculateRoomMode(players)).toEqual('2');
  });

  test('it returns both as strings if theres a tie', () => {
    const players: RoomPlayers = {
      playerA: {
        name: 'playerA',
        value: '2',
        flipped: true,
      },
      playerB: {
        name: 'playerB',
        value: '1',
        flipped: true,
      },
    };

    expect(calculateRoomMode(players)).toEqual('2,1');
  });

  test('it doest crap out if no one is flipped', () => {
    const players: RoomPlayers = {
      playerA: {
        name: 'playerA',
        value: '2',
        flipped: false,
      },
      playerB: {
        name: 'playerB',
        value: '1',
        flipped: false,
      },
    };

    expect(calculateRoomMode(players)).toEqual('');
  });
});

describe('calculateRoomMean', () => {
  test('it calcualtes the mean and returns a string', () => {
    const players: RoomPlayers = {
      playerA: {
        name: 'playerA',
        value: '2',
        flipped: true,
      },
      playerB: {
        name: 'playerB',
        value: '1',
        flipped: true,
      },
    };

    expect(calculateRoomMean(players)).toEqual('1.5');
  });

  test('it only calcualtes the mean of flipped players', () => {
    const players: RoomPlayers = {
      playerA: {
        name: 'playerA',
        value: '2',
        flipped: true,
      },
      playerB: {
        name: 'playerB',
        value: '1',
        flipped: false,
      },
    };

    expect(calculateRoomMean(players)).toEqual('2');
  });

  test('it doest crap out if no one is flipped', () => {
    const players: RoomPlayers = {
      playerA: {
        name: 'playerA',
        value: '2',
        flipped: false,
      },
      playerB: {
        name: 'playerB',
        value: '1',
        flipped: false,
      },
    };

    expect(calculateRoomMean(players)).toEqual('');
  });
});
