import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { DeviceData } from '../types/DeviceData.interface';

export const ProfileButton: FunctionComponent<{
  deviceData: DeviceData;
}> = ({ deviceData, children }) => {
  // ----------------------------------------
  // state
  // ----------------------------------------
  const [expanded, setExpanded] = useState(false);

  // ----------------------------------------
  // effects
  // ----------------------------------------
  const buttonRef = useRef(null);
  useEffect(() => {
    function foobar(e: MouseEvent) {
      if (e.target !== buttonRef.current) {
        setExpanded(false);
      }
    }
    window.addEventListener('click', foobar);

    return function cleanup() {
      window.removeEventListener('click', foobar);
    };
  }, []);

  // ----------------------------------------
  // render
  // ----------------------------------------
  return (
    <div className="btn-group">
      <div className="dropdown">
        <button
          ref={buttonRef}
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          id="profileMenuButton"
          aria-label="Profile Options"
          data-bs-toggle="dropdown"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          Hello {deviceData.name}!
        </button>
        <ul
          className={`dropdown-menu ${expanded ? 'show' : ''}`}
          style={{ right: 0, left: 'auto' }}
          aria-labelledby="profileMenuButton"
        >
          {children}
        </ul>
      </div>
    </div>
  );
};
