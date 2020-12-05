const APP_NAME = "PLANNING_POKER";
const getKey = key => `${APP_NAME}.${key}`;

export const setAppStorage = (key, value) => {
  localStorage.setItem(getKey(key), JSON.stringify(value));
  return value;
};

export const getAppStorage = key =>
  JSON.parse(localStorage.getItem(getKey(key)));
