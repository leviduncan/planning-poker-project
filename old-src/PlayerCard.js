import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

function cardClass(flipped, value) {
  if (!value) {
    return "empty";
  }
  if (!flipped) {
    return "ready";
  }
  return "flipped";
}

export default ({ username, player, onRemovePlayer, currentUser }) => {
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

  const props = {
    boxShadow: "0px 10px 20px 0px rgba(0,0,0,0.4)",
    from: { boxShadow: "0px 0px 0px 0px rgba(0,0,0,0.4)" }
  };

  return (
    <div className="col-6 col-sm-4 col-md-3 mb-3">
      <div className={`player-tile ${currentUser === username ? "me" : ""}`}>
        <div className="player-remove" onClick={() => onRemovePlayer(username)}>
          ✕
        </div>
        <div className="player-name">
          <div>{player.name}</div>
          <small>{currentUser === username ? "(you)" : ""}</small>
        </div>
        <animated.div
          className={`player-card ${pulse ? "pulse" : ""} ${cardClass(
            player.flipped,
            player.value
          )}`}
        >
          <div>{player.flipped ? player.value : ""}</div>
        </animated.div>
      </div>
    </div>
  );
};
