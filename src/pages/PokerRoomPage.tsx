import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoomsService } from '../services/Rooms.service';
import { DeviceData } from '../types/DeviceData.interface';
import { Room } from '../types/Room';
import { PokerRoom } from '../components/PokerRoom';

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
    RoomsService.onRoomUpdate(roomId, (newRoomData) => {
      setLoading(false);
      console.log('newRoomData =', newRoomData);

      if (newRoomData) {
        setInvalidRoom(false);
        setRoom(newRoomData);
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
  } else if (invalidRoom || !room) {
    return <div>Room Not Found</div>;
  } else {
    return (
      <PokerRoom
        roomId={roomId}
        room={room}
        deviceData={deviceData}
      ></PokerRoom>
    );
  }
};
