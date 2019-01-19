import * as NodeCache from 'node-cache'

export class BaseCache {
  public cache: NodeCache
  constructor(options: NodeCache.Options)
  public get(key: string): Promise<string>
  public set(key: string, value: string): Promise<boolean>
  public del(key: string): Promise<void>
  public delStartWith(startWithStr: string): Promise<null | void>
  public keys(): Promise<string[]>
  public flush(): Promise<void>
}
