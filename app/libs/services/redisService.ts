import {createClient} from 'redis';

import {REDIS_DB_CHANNEL} from '@libs/constants/app';

interface IRedisService {
  subscribe(onMessage: (message: string) => void, onError: () => void, type?: string): void;
  unsubscribe(type?: string): void;
}

type IRedisServiceCallback = (message: string) => void;

const DEFAULT_TYPE = 'default';

class RedisService {
  private _onMessageMap: Map<string, IRedisServiceCallback> = new Map();
  private _onErrorMap: Map<string, () => void> = new Map();

  constructor() {
    this._init();
  }

  static instance: IRedisService;

  static getInstance() {
    if (!RedisService.instance) {
      RedisService.instance = new RedisService();
    }

    return RedisService.instance;
  }

  subscribe(onMessage: (message: string) => void, onError: () => void, type: string = DEFAULT_TYPE) {
    if (typeof onMessage === 'function') {
      this._onMessageMap.set(type, onMessage);
    }

    if (typeof onError === 'function') {
      this._onErrorMap.set(type, onError);
    }
  }

  unsubscribe(type: string = DEFAULT_TYPE) {
    this._onMessageMap.delete(type);
    this._onErrorMap.delete(type);
  }

  private async _init() {
    const client = createClient();

    client.on('ready', async () => {
      console.log('Redis Client is ready to use.');
    });

    client.on('error', err => {
      this._onError();

      console.error('Redis Client Error: ', err);
    });

    await client.connect();

    await this._subscribe(client);
  }

  private async _subscribe(client: any) {
    const clientSub = client.duplicate();

    await clientSub.connect();
    await clientSub.subscribe(REDIS_DB_CHANNEL, this._onMessage.bind(this));
  }

  private _onMessage(message: string) {
    const data = JSON.parse(message);

    for (const [type, callback] of this._onMessageMap.entries()) {
      if (type === DEFAULT_TYPE || type === data.type) {
        callback(message);
      }
    }
  }

  private _onError() {
    for (const callback of this._onErrorMap.values()) {
      callback();
    }
  }
}

const redisService: IRedisService = RedisService.getInstance();

export default redisService;
