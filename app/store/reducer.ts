import {DataShowType, DataSortType} from '@libs/constants/app';

export interface IReducerState {
  address: string;
  isUnlocked: boolean;
  connections: {[key: string]: boolean};
  query: string;
  metadataPage: number;
  metadataPages: number;
  sortType: DataSortType;
  showType: DataShowType;
  userdataQuery: string;
  userdataPage: number;
  userdataPages: number;
  userdataSortType: DataSortType;
  userdataShowType: DataShowType;
}

export interface IReducerAction {
  type: string;
  payload?: any;
}

export const ReducerEventType = {
  UPDATE_WALLET_STATE: 'REDUCER_UPDATE_WALLET_STATE',
  UPDATE_METADATA_PAGE_STATE: 'REDUCER_UPDATE_METADATA_PAGE_STATE',
  SEARCH_METADATA_QUERY: 'REDUCER_SEARCH_METADATA_QUERY',
  SWITCH_METADATA_SORT_TYPE: 'REDUCER_SWITCH_METADATA_SORT_TYPE',
  SWITCH_METADATA_SHOW_TYPE: 'REDUCER_SWITCH_METADATA_SHOW_TYPE',
  UPDATE_USERDATA_PAGE_STATE: 'REDUCER_UPDATE_USERDATA_PAGE_STATE',
  SEARCH_USERDATA_QUERY: 'REDUCER_SEARCH_USERDATA_QUERY',
  SWITCH_USERDATA_SORT_TYPE: 'REDUCER_SWITCH_USERDATA_SORT_TYPE',
  SWITCH_USERDATA_SHOW_TYPE: 'REDUCER_SWITCH_USERDATA_SHOW_TYPE',
};

export const initialState = {
  address: '',
  isUnlocked: false,
  connections: {},
  query: '',
  metadataPage: 1,
  metadataPages: 0,
  sortType: DataSortType.NONE,
  showType: DataShowType.GRID,
  userdataQuery: '',
  userdataPage: 1,
  userdataPages: 0,
  userdataSortType: DataSortType.NONE,
  userdataShowType: DataShowType.GRID,
};

export const reducer = (state: IReducerState, action: IReducerAction): any => {
  switch (action.type) {
    case ReducerEventType.UPDATE_WALLET_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ReducerEventType.SEARCH_METADATA_QUERY: {
      const {query} = action.payload;

      return {
        ...state,
        query,
      };
    }
    case ReducerEventType.SWITCH_METADATA_SORT_TYPE: {
      const {sortType} = action.payload;

      return {
        ...state,
        sortType,
      };
    }
    case ReducerEventType.SWITCH_METADATA_SHOW_TYPE: {
      const {showType} = action.payload;

      return {
        ...state,
        showType,
      };
    }
    case ReducerEventType.UPDATE_METADATA_PAGE_STATE: {
      const {metadataPage, metadataPages} = action.payload;

      return {
        ...state,
        metadataPage,
        metadataPages,
      };
    }
    case ReducerEventType.SEARCH_USERDATA_QUERY: {
      const {userdataQuery} = action.payload;

      return {
        ...state,
        userdataQuery,
      };
    }
    case ReducerEventType.SWITCH_USERDATA_SORT_TYPE: {
      const {userdataSortType} = action.payload;

      return {
        ...state,
        userdataSortType,
      };
    }
    case ReducerEventType.SWITCH_USERDATA_SHOW_TYPE: {
      const {userdataShowType} = action.payload;

      return {
        ...state,
        userdataShowType,
      };
    }
    case ReducerEventType.UPDATE_USERDATA_PAGE_STATE: {
      const {userdataPage, userdataPages} = action.payload;

      return {
        ...state,
        userdataPage,
        userdataPages,
      };
    }
    default:
      throw new Error('Unexpected action');
  }
};
