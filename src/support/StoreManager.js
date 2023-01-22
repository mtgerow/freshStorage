import {isValidType} from './Storage.types';

export const PREFIX = 'fresh_storage_';

export class StoreManager {
  getItem(key) {
    this.validateKey(key);
    let item = localStorage.getItem(PREFIX + key);
    if (item) {
      item = JSON.parse(item);
    }
    return this.isExpired(item) ? undefined : item.data;
  }

  setItem(key, value) {
    this.validateKey(key);
    this.validateStoreObject(value);
    if(!this.isExpired(value)) {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    }
  }

  removeItem(key) {
    this.validateKey(key);
    localStorage.removeItem(PREFIX + key);
  }

  validateKey(key) {
    if(!key || typeof key !== 'string') {
      throw new Error("[Error 0011] The key is not in a proper format. Required: string format for all keys.")
    }
  }

  validateStoreObject(value) {
    if(!value || typeof value !== 'object') {
      throw new Error("[Error 012] The item must be in the correct object form.");
    }
    const {config, exp, type} = value;
    if(!type || !isValidType(type)) {
      throw new Error("[Error 013] The item does not have a valid type.")
    }
    if(!config || typeof config !== 'object') {
      throw new Error("[Error 014] The item does not have a valid configuration.");
    }
    if(!exp || this.isExpired(value)) {
      throw new Error("[Error 015] The item is expired.")
    }
  }

  isExpired(value) {
    const {exp} = value;
    const now = new Date().getTime();
    return !isNaN(exp) && exp < now;
  }

  getAllItems() {
    let storedItems = {};
    let keys = Object.keys(localStorage);
    keys.forEach((key)=> {
      if(key.startsWith(PREFIX)) {
        storedItems[key] = localStorage.getItem(key);
      }
    });
    return storedItems;
  }

  clear() {
    const items = this.getAllItems();
    const keys = Object.keys(items);
    keys.forEach(key => {
      localStorage.removeItem(key);
    });
  }
}
