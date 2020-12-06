import { useState, useEffect, FunctionComponent } from 'react';
import './PlayerCard.css';
import { animated } from 'react-spring';
import { Player } from '../types/Player';

function cardClass(flipped: boolean, value: string) {
  if (!value) {
    return 'empty';
  }
  if (!flipped) {
    return 'ready';
  }
  return 'flipped';
}

export const PlayerCard: FunctionComponent<{
  username: string;
  currentUser: string;
  player: Player;
  onRemovePlayer: (username: string) => void;
}> = ({ username, player, onRemovePlayer, currentUser }) => {
  // ----------------------------------------
  // state
  // ----------------------------------------
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (player.value) {
      setPulse(true);
    }
    const timeoutId = setTimeout(() => {
      setPulse(false);
    }, 1000);

    return () => {
      // Clean up the timeout
      clearTimeout(timeoutId);
    };
  }, [player.value]);

  // ----------------------------------------
  // render
  // ----------------------------------------
  return (
    <div className="col-6 col-sm-4 col-md-3 mb-3">
      <div className={`player-tile ${currentUser === username ? 'me' : ''}`}>
        <div className="player-remove" onClick={() => onRemovePlayer(username)}>
          ✕
        </div>
        <div className="player-name">
          <div>{player.name}</div>
          <small>{currentUser === username ? '(you)' : ''}</small>
        </div>
        <animated.div
          className={`player-card ${pulse ? 'pulse' : ''} ${cardClass(
            player.flipped,
            player.value
          )}`}
        >
          <div>{player.flipped ? player.value : ''}</div>
        </animated.div>
      </div>
    </div>
  );
};
