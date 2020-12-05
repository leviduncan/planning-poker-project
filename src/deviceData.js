import { getAppStorage, setAppStorage, clearAppStorage } from "./appStorage";

class DeviceData {
  constructor() {
    this.name = null;
    this.username = null;
  }
}

export const setDeviceData = data => setAppStorage("deviceData", data);

export const getDeviceData = () =>
  getAppStorage("deviceData") || new DeviceData();

export const resetDeviceData = () => {
  setAppStorage("deviceData", new DeviceData());
  return getAppStorage("deviceData");
};
