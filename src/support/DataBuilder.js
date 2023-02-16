import {STORAGE_TYPES} from './Constants.js';

export class DataBuilder {
    buildBasicDataItem(value, exp) {
        return {
            type: STORAGE_TYPES.BASIC_EXPIRATION,
            config: {},
            data: this.parseValue(value),
            exp
        };
    }

    parseValue(value) {
        if(this.isValidDate(value)) {
            return '__fs_date__' + value.getTime();
        }
        else if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            const newObj = {};
            Object.keys(value).forEach(key => {
                newObj[key] = this.parseValue(value[key]);
            });
            return newObj;
        }
        else if (Array.isArray(value)) {
            const newArray = [];
            value.forEach(arrayValue => {
                newArray.push(this.parseValue(arrayValue));
            });
            return newArray;
        }
        else {
            return value;
        }
    }

    isValidDate(date) {
        return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
    }
}
