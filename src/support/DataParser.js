import { DATE_KEY } from './Constants.js';

export class DataParser {
  parse(value) {
    if(typeof value === 'object' && !Array.isArray(value) && value !== null) {
      const newObj = {};
      Object.keys(value).forEach(key => {
        newObj[key] = this.parse(value[key]);
      });
      return newObj;
    }
    else if (Array.isArray(value)) {
      const newArray = [];
      value.forEach(arrayValue => {
        newArray.push(this.parse(arrayValue));
      });
      return newArray;
    }
    else if(typeof value === 'string' && value.indexOf(DATE_KEY) > -1) {
      const epochTime = Number.parseInt(value.substring(DATE_KEY.length));
      return new Date(epochTime);
    }
    else {
      return value;
    }
  }
}
