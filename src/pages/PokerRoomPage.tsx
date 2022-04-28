import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoomsService } from '../services/Rooms.service';
import { DeviceData } from '../types/DeviceData.interface';
import { Room } from '../types/Room';
import { PokerRoom } from '../components/PokerRoom';
import { analytics } from '../services/Db.service';

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

        logPageView(roomId, newRoomData);
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

function logPageView(roomId: string, newRoomData: Room) {
  try {
    analytics.logEvent('page_view', {
      page_title: `Room ${newRoomData.name}`,
      page_location: window.location.href,
      page_path: `/#/rooms/${roomId}`,
    });
  } catch (error) {}
}
