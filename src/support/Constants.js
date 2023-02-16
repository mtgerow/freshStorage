export const STORAGE_TYPES = {
  BASIC_EXPIRATION: "exp",
  LOADER: "load",
  ASYNC_LOADER: "async_load"
};

export const isValidType = (type) => {
  return Object.values(STORAGE_TYPES).indexOf(type) > -1;
}

export const DATE_KEY = '__fs_date__';
