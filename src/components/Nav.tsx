import { FunctionComponent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DeviceDataService } from '../services/DeviceData.service';
import { DeviceData } from '../types/DeviceData.interface';
import { ProfileButton } from './ProfileButton';

export const Nav: FunctionComponent<{ deviceData: DeviceData | null }> = ({
  deviceData,
}) => {
  // ----------------------------------------
  // state
  // ----------------------------------------
  const history = useHistory();

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  function logout() {
    DeviceDataService.setDeviceData(null);
    history.push('/');
  }

  // ----------------------------------------
  // render
  // ----------------------------------------
  return (
    <nav className="navbar navbar-light bg-light">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Link className="navbar-brand" to="/">
          Planning Poker
        </Link>
        {deviceData && (
          <ProfileButton deviceData={deviceData}>
            <li>
              <button className="dropdown-item" onClick={logout}>
                Logout
              </button>
            </li>
          </ProfileButton>
        )}
      </div>
    </nav>
  );
};
