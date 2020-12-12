import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import { DeviceDataService } from '../services/DeviceData.service';
import { DeviceData } from '../types/DeviceData.interface';

export const Nav: FunctionComponent<{ deviceData: DeviceData }> = ({
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
    <div className="mb-3">
      <div>hello {deviceData.name}</div>
      <div>username = {deviceData.userId}</div>
      <div>
        <button className="btn btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
