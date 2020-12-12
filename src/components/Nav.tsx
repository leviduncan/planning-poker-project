import { FunctionComponent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DeviceDataService } from '../services/DeviceData.service';
import { DeviceData } from '../types/DeviceData.interface';

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
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Planning Poker
        </Link>
        {deviceData && (
          <div>
            <span className="mr-2">Hello {deviceData.name}!</span>
            <button className="btn btn-outline-danger" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
