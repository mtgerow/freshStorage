import { StoreManager } from './support/StoreManager';
import { DataBuilder } from './support/DataBuilder';
import { GarbageCollector } from './support/GarbageCollector';
import { DateParser } from './support/DateParser';

const storeManager = new StoreManager();
const dataBuilder = new DataBuilder();
new GarbageCollector(storeManager);
const dateParser = new DateParser();

export class FreshStorage {
  setItem(key, value, expiration) {
    const exp = dateParser.parse(expiration);
    const item = dataBuilder.buildBasicDataItem(value, exp.getTime());
    storeManager.setItem(key, item);
  }

  getItem(key) {
    const item = storeManager.getItem(key);
    return item;
  }
}

if(!window.freshStorage) {
  window.freshStorage = new FreshStorage();
}

export default window.freshStorage;


