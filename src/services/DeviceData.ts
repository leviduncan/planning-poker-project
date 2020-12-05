import { v4 as uuidv4 } from 'uuid';
import { DeviceData } from '../types/DeviceData.interface';
import { LocalStorageService } from './LocalStorage';

const localStorage = new LocalStorageService<DeviceData>('PLANNING_POKER');
const LOCAL_STORAGE_KEY = 'deviceData';
type OnChangeCallback = (deviceData: DeviceData) => void;
const callbacks: OnChangeCallback[] = [];

function getDeviceData(): DeviceData {
  return localStorage.getAppStorage(LOCAL_STORAGE_KEY);
}

function setDeviceData(deviceData: DeviceData): DeviceData {
  const newData = localStorage.setAppStorage(LOCAL_STORAGE_KEY, deviceData);
  callbacks.forEach((callback) => callback(newData));
  return newData;
}

function onChange(callback: OnChangeCallback) {
  callbacks.push(callback);
}

function setName(name: string): void {
  setDeviceData({
    ...getDeviceData(),
    name: name,
    username: `${uuidv4()}_${name}`,
  });
}

export const DeviceDataService = {
  getDeviceData,
  setDeviceData,
  onChange,
  setName,
};
