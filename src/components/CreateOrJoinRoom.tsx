import { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RoomsService } from '../services/Rooms.service';

export const CreateOrJoinRoom: FunctionComponent<{}> = () => {
  // ----------------------------------------
  // state
  // ----------------------------------------
  const [roomName, setRoomName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const history = useHistory();

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  function createRoom(e: React.FormEvent) {
    e.preventDefault();
    roomName &&
      RoomsService.createRoom(roomName)
        .then((newRoomCode) => {
          navigateToRoom(newRoomCode);
        })
        .catch((err) => {
          console.log('err =', err);
        });
  }

  function joinRoom(e: React.FormEvent) {
    e.preventDefault();
    if (!roomCode) {
      return;
    }

    navigateToRoom(roomCode);
  }

  function navigateToRoom(roomCode: string) {
    history.push(`/rooms/${roomCode}`);
  }

  // ----------------------------------------
  // render
  // ----------------------------------------
  return (
    <div>
      <form onSubmit={joinRoom}>
        <label htmlFor="roomCode">Join Room:</label>
        <div className="input-group mb-3">
          <input
            id="roomCode"
            type="text"
            className="form-control"
            placeholder="Room Code"
            aria-label="Room Code"
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary"
              type="submit"
              id="joinRoomButton"
            >
              Join Room
            </button>
          </div>
        </div>
      </form>

      <form onSubmit={createRoom}>
        <label htmlFor="roomName">Create Room:</label>
        <div className="input-group mb-3">
          <input
            id="roomName"
            type="text"
            className="form-control"
            placeholder="Room Name"
            aria-label="Room Name"
            onChange={(e) => setRoomName(e.target.value)}
          />
          <div className="input-group-append">
            <button
              id="createRoomButton"
              className="btn btn-outline-secondary"
              type="submit"
            >
              Create Room
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
