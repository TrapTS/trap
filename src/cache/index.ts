import * as NodeCache from 'node-cache'
import { BaseCache } from '../typings'

export class Cache implements BaseCache {
  public cache: NodeCache
  constructor(options: NodeCache.Options) {
    this.cache = new NodeCache(options)
  }

  public async get(key: string): Promise<string> {
    const value: string | undefined = await this.cache.get(key)
    if (value) return value
    return ''
  }

  public async set(key: string, value: string): Promise<boolean> {
    return await this.cache.set(key, value)
  }

  public async del(key: string): Promise<void> {
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

  public async flush(): Promise<void> {
    await this.cache.flushAll()
  }
}
