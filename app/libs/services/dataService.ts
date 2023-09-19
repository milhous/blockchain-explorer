import {NETWORK_NAME, CHANNEL_NAME, MSP_NAME, ChaincodesName} from '@libs/constants/app';

import crudService from './crudService';

class DataService {
  constructor() {}

  async getMetadatas(params: {
    page: number;
    limit: number;
    search?: string;
    orderBy?: {
      [key: string]: any;
    };
  }): Promise<IServiceMetadata[]> {
    const {page, limit, search, orderBy} = params;
    const result: IServiceMetadata[] = await crudService.findMetadatas({
      networkName: NETWORK_NAME,
      channelName: CHANNEL_NAME,
      mspName: MSP_NAME,
      chaincodeName: ChaincodesName.SOS,
      skip: page * limit,
      take: limit,
      search: this._getSearch(search),
      orderBy: orderBy,
    });

    return result;
  }

  async getMetadataCount(search?: string): Promise<number> {
    const result = await crudService.countMetadata({
      networkName: NETWORK_NAME,
      channelName: CHANNEL_NAME,
      mspName: MSP_NAME,
      chaincodeName: ChaincodesName.SOS,
      search: this._getSearch(search),
    });

    return result;
  }

  async getUserdatas(params: {
    page: number;
    limit: number;
    search?: string;
    orderBy?: {
      [key: string]: any;
    };
  }): Promise<ISQLUserdata[]> {
    const {page, limit, search, orderBy} = params;
    const result: ISQLUserdata[] = await crudService.findUserdatas({
      networkName: NETWORK_NAME,
      channelName: CHANNEL_NAME,
      mspName: MSP_NAME,
      chaincodeName: ChaincodesName.SOS,
      skip: page * limit,
      take: limit,
      search: this._getSearch(search),
      orderBy: orderBy,
    });

    return result;
  }

  async getUserdatasCount(search?: string): Promise<number> {
    const result = await crudService.countUserdata({
      networkName: NETWORK_NAME,
      channelName: CHANNEL_NAME,
      mspName: MSP_NAME,
      chaincodeName: ChaincodesName.SOS,
      search: this._getSearch(search),
    });

    return result;
  }

  private _getSearch(search: string | undefined): string | undefined {
    if (typeof search !== 'string' || search === '') {
      return search;
    }

    const result = search.trim().split(' ').join(' <-> ');

    return result;
  }
}

const dataService = new DataService();

export default dataService;
