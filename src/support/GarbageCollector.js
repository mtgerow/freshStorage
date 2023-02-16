import {STORAGE_TYPES} from './Constants.js';

export class GarbageCollector
{
  constructor(storeManager) {
    this.manager = storeManager;
    setInterval(this.removeUnused, 1000*60*2)
  }

  removeUnused() {
    const items = this.manager.getAllItems();
    Object.keys(items).forEach((key)=>{
      const item = items[key];
      if(item.type === STORAGE_TYPES.BASIC_EXPIRATION
        && this.manager.isExpired(item)) {
        this.manager.removeItem(key);
      }
    });
  }
}
