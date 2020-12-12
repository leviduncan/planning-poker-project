import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoomsService } from '../services/Rooms.service';
import { DeviceData } from '../types/DeviceData.interface';
import { Room } from '../types/Room';

export const PokerRoomPage: FunctionComponent<{ deviceData: DeviceData }> = ({
  deviceData,
}) => {
  // ----------------------------------------
  // state
  // ----------------------------------------
  const { roomId } = useParams<{ roomId: string }>();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [invalidRoom, setInvalidRoom] = useState(false);

  // ----------------------------------------
  // effects
  // ----------------------------------------
  useEffect(() => {
    setLoading(true);
    RoomsService.getRoomRef(roomId).on('value', (snapshot) => {
      setLoading(false);
      const roomData = snapshot.val();

      if (roomData) {
        setInvalidRoom(false);
        setRoom(roomData);
      } else {
        setInvalidRoom(true);
      }
    });
  }, [roomId]);

  // ----------------------------------------
  // helper functions
  // ----------------------------------------

  // ----------------------------------------
  // render
  // ----------------------------------------
  if (loading) {
    return <div>Loading...</div>;
  } else if (invalidRoom) {
    return <div>Room Not Found</div>;
  } else {
    return (
      <div>
        in room {roomId}
        <pre>{JSON.stringify(room, null, 2)}</pre>
      </div>
    );
  }
};
