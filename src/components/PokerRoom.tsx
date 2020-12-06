import { FunctionComponent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RoomsService } from '../services/Rooms';
import { Room } from '../types/Room';

export const PokerRoom: FunctionComponent<{}> = () => {
  // ----------------------------------------
  // state
  // ----------------------------------------
  const { id } = useParams<{ id: string }>();
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    console.log('get data for room id =', id);
    RoomsService.getRoomData(id).on('value', (snapshot) => {
      setRoom(snapshot.val());
    });
  }, [id]);

  // ----------------------------------------
  // helper functions
  // ----------------------------------------

  // ----------------------------------------
  // render
  // ----------------------------------------

  return (
    <div>
      <div>You're in poker room: {id}</div>
      <pre>{JSON.stringify(room)}</pre>
    </div>
  );
};
