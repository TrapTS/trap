import * as NodeCache from 'node-cache'
import { CacheStatus, BaseCache } from '../typings'

export class Cache implements BaseCache {
  public cache: NodeCache
  constructor(options: NodeCache.Options) {
    this.cache = new NodeCache(options)
  }

  public async get(key: string): Promise<string | undefined> {
    return await this.cache.get(key)
  }

  public async mget(keys: string[]): Promise<Object> {
    return await this.cache.mget(keys)
  }

  public async set(key: string, value: string): Promise<boolean> {
    return await this.cache.set(key, value)
  }

  public async del(key: string | string[]): Promise<void> {
    await this.cache.del(key)
  }

  // TODO: redis can get keys by like search
  public async delStartWith(startWithStr: string = ''): Promise<null | void> {
    if (!startWithStr) return
    const keys: string[] = await this.cache.keys()
    for await (let key of keys) {
      if (key.indexOf(startWithStr) === 0) this.del(key)
    }
  }

  public async keys(): Promise<string[]> {
    return this.cache.keys()
  }

  public async getStats(): Promise<CacheStatus> {
    return await this.cache.getStats()
  }

  public async flush(): Promise<void> {
    await this.cache.flushAll()
  }

  public async close(): Promise<void> {
    await this.cache.close()
  }
}
