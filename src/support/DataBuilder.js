import {STORAGE_TYPES} from './Storage.types';

export class DataBuilder {
    buildBasicDataItem(value, exp) {
        return {
            type: STORAGE_TYPES.BASIC_EXPIRATION,
            config: {},
            data: value,
            exp
        };
    }
}
