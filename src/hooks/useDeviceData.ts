import { useEffect, useState } from 'react';
import { DeviceDataService } from '../services/DeviceData';
import { DeviceData } from '../types/DeviceData.interface';

export function useDeviceData(): [DeviceData | null, (name: string) => void] {
  const [deviceData, setDeviceData] = useState<DeviceData | null>(
    DeviceDataService.getDeviceData()
  );

  // ----------------------------------------
  // effects
  // ----------------------------------------
  useEffect(() => {
    DeviceDataService.onChange(setDeviceData);
  }, []);

  // ----------------------------------------
  // helper functions
  // ----------------------------------------
  function setName(name: string) {
    DeviceDataService.setName(name);
  }

  return [deviceData, setName];
}
