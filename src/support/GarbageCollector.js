import {STORAGE_TYPES} from './Constants.js';
import { StoreManager, PREFIX } from './StoreManager';

const TWO_MINUTES = 1000*60*2;
export class GarbageCollector
{
  constructor() {
    this.manager = new StoreManager();
    setInterval(() => {
      this.removeUnused(this.manager)
    }, TWO_MINUTES);
  }

  removeUnused(manager) {
    const items = manager.getAllItems();
    Object.keys(items).forEach((key) => {
      const item = items[key];
      if(item.type === STORAGE_TYPES.BASIC_EXPIRATION && manager.isExpired(item)) {
        const localKey = key.replace(PREFIX, '');
        manager.removeItem(localKey);
      }
    });
  }
}
