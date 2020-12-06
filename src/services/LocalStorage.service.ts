export class LocalStorageService<T> {
  constructor(private APP_NAME: string) {}

  setAppStorage(key: string, value: T) {
    localStorage.setItem(this.getKey(key), JSON.stringify(value));
    return value;
  }

  getAppStorage(key: string): T {
    const stringifiedValue = localStorage.getItem(this.getKey(key));
    return stringifiedValue && JSON.parse(stringifiedValue);
  }

  private getKey(key: string): string {
    return `${this.APP_NAME}.${key}`;
  }
}
