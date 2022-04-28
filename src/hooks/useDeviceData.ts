import { useEffect, useState } from 'react';
import { analytics } from '../services/Db.service';
import { DeviceDataService } from '../services/DeviceData.service';
import { MaybeDeviceData } from '../types/DeviceData.interface';

export function useDeviceData(): [MaybeDeviceData, (name: string) => void] {
  const [deviceData, setDeviceData] = useState<MaybeDeviceData>(
    DeviceDataService.getDeviceData()
  );

  // ----------------------------------------
  // effects
  // ----------------------------------------
  useEffect(() => {
    DeviceDataService.onChange((deviceData) => {
      trackUserId(deviceData);
      setDeviceData(deviceData);
    });
  }, []);

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  function setName(name: string) {
    DeviceDataService.setName(name);
  }

  return [deviceData, setName];
}
function trackUserId(deviceData: MaybeDeviceData) {
  if (deviceData?.userId) {
    analytics.setUserId(deviceData.userId);
  }
}
