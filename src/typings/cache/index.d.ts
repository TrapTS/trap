import * as NodeCache from 'node-cache'

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

export interface Cache{
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
