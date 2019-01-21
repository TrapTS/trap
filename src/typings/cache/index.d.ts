import * as NodeCache from 'node-cache'
import * as IORedis from 'ioredis'

interface CacheStatus {
  keys: number
  hits: number
  misses: number
  ksize: number
  vsize: number
}

export class BaseCache {
  public cache: NodeCache
  constructor(options: NodeCache.Options)
  public get(key: string): Promise<string | undefined>
  public set(key: string, value: string): Promise<boolean>
  public mget(keys: string[]): Promise<Object>
  public del(key: string | string[]): Promise<void>
  public delStartWith(startWithStr: string): Promise<null | void>
  public keys(): Promise<string[]>
  public getStats(): Promise<CacheStatus>
  public flush(): Promise<void>
  public close(): Promise<void>
}

export interface Cache {
  get(key: string): Promise<string | undefined>
  set(key: string, value: string): Promise<boolean>
  mget(keys: string[]): Promise<Object>
  del(key: string | string[]): Promise<void>
  delStartWith(startWithStr: string): Promise<null | void>
  keys(): Promise<string[]>
  getStats(): Promise<CacheStatus>
  flush(): Promise<void>
  close(): Promise<void>
}

export interface RedisCache {
  get(key: IORedis.KeyType): Promise<string | null>
  mget(...keys: IORedis.KeyType[]): Promise<any>
  hget(key: IORedis.KeyType, field: string): Promise<string | null>
  hmget(key: IORedis.KeyType, ...fields: string[]): Promise<any>
  set(
    key: IORedis.KeyType,
    value: any,
    expiryMode?: string | any[],
    time?: number | string,
    setMode?: number | string
  ): Promise<string>
  hset(key: IORedis.KeyType, field: string, value: any): Promise<0 | 1>
  hmset(key: IORedis.KeyType, data: any): Promise<0 | 1>
  setrange(key: IORedis.KeyType, offset: number, value: any): Promise<number>
  del(...keys: IORedis.KeyType[]): Promise<number>
  incr(key: IORedis.KeyType): Promise<number>
  lrange(key: IORedis.KeyType, start: number, stop: number): Promise<any>
  keys(pattern: string): Promise<string[]>
  exec(): Promise<any>
  flushall(): Promise<string>
  sort(key: IORedis.KeyType, ...args: string[]): Promise<any>
  patterndel(pattern: string): Promise<any>
}
