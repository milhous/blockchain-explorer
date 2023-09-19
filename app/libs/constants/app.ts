export const DEFAULT_LOCALE = 'zh';

export const LOCALES = ['zh', 'en'];

export enum AnimationState {
  OUT,
  IN,
  ING,
}

export const METADATA_SHOW_MAX = 9;

export const PUBLISHED_LIST_MAX = 18;

export const METADATA_FIELDS_MAX = 20;

export const DATA_PAGE_LIMIT = 12;

export enum DataSortType {
  NONE,
  NAME_UP,
  NAME_DOWN,
  DATA_VOLUME_UP,
  DATA_VOLUME_DOWN,
  TIME_UP,
  TIME_DOWN,
}

export enum DataShowType {
  GRID,
  ENTITY,
}

export enum OrderBySortType {
  ASC = 'asc',
  DESC = 'desc',
}

export const NETWORK_NAME = 'jasmy-dev-network';
export const CHANNEL_NAME = 'jasmy-nft-dev';
export const MSP_NAME = 'GeneralPublic';
export const ChaincodesName = {
  SOS: 'sos',
};

export const REDIS_DB_CHANNEL = 'redis-db-changes';
