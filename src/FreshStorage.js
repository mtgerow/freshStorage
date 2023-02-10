import { StoreManager } from './support/StoreManager';
import { DataBuilder } from './support/DataBuilder';
import { GarbageCollector } from './support/GarbageCollector';
import { DateParser } from './support/DateParser';

class FreshStorage {
  constructor() {
    this.storeManager = new StoreManager();
    this.dataBuilder = new DataBuilder();
    new GarbageCollector(this.storeManager);
    this.dateParser = new DateParser();
  }

  setItem(key, value, expiration) {
    const exp = this.dateParser.parse(expiration);
    const item = this.dataBuilder.buildBasicDataItem(value, exp.getTime());
    this.storeManager.setItem(key, item);
  }

  getItem(key) {
    const item = this.storeManager.getItem(key);
    return item;
  }

  clear() {
    this.storeManager.clear();
  }

  removeItem(key) {
    this.storeManager.removeItem(key);
  }
}

if(!window.freshStorage) {
  window.freshStorage = new FreshStorage();
}

export default window.freshStorage;


