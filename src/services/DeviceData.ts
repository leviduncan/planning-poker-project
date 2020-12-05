import { v4 as uuidv4 } from 'uuid';
import { MaybeDeviceData } from '../types/DeviceData.interface';
import { LocalStorageService } from './LocalStorage';

const localStorage = new LocalStorageService<MaybeDeviceData>('PLANNING_POKER');
const LOCAL_STORAGE_KEY = 'deviceData';
type OnChangeCallback = (deviceData: MaybeDeviceData) => void;
const callbacks: OnChangeCallback[] = [];

function getDeviceData(): MaybeDeviceData {
  return localStorage.getAppStorage(LOCAL_STORAGE_KEY);
}

function setDeviceData(deviceData: MaybeDeviceData): MaybeDeviceData {
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
