import React, { FunctionComponent } from 'react';
import { Link, useParams } from 'react-router-dom';

export const PokerRoom: FunctionComponent<{}> = () => {
  // ----------------------------------------
  // state
  // ----------------------------------------

  // ----------------------------------------
  // helper functions
  // ----------------------------------------

  // ----------------------------------------
  // render
  // ----------------------------------------
  console.log('useParams =', useParams());

  return (
    <div>
      <Link to="/">home</Link>
    </div>
  );
};
