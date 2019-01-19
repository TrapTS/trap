import * as IORedis from 'ioredis'

export class RedisCache {
  client: IORedis.Redis
  constructor(options: IORedis.RedisOptions) {
    this.client = new IORedis(options)
  }

  public async get(key: IORedis.KeyType): Promise<string | null> {
    return await this.client.get(key)
  }

  public async mget(...keys: IORedis.KeyType[]): Promise<any> {
    return await this.client.mget(...keys)
  }

  public async hget(
    key: IORedis.KeyType,
    field: string
  ): Promise<string | null> {
    return this.client.hget(key, field)
  }

  public async hmget(key: IORedis.KeyType, ...fields: string[]): Promise<any> {
    return this.client.hmget(key, ...fields)
  }

  public async getrange(
    key: IORedis.KeyType,
    start: number,
    end: number
  ): Promise<string> {
    return await this.client.getrange(key, start, end)
  }

  public async set(
    key: IORedis.KeyType,
    value: any,
    expiryMode?: string | any[],
    time?: number | string,
    setMode?: number | string
  ): Promise<string> {
    return await this.client.set(key, value, expiryMode, time, setMode)
  }

  public async hset(
    key: IORedis.KeyType,
    field: string,
    value: any
  ): Promise<0 | 1> {
    return await this.client.hset(key, field, value)
  }

  public async hmset(key: IORedis.KeyType, data: any): Promise<0 | 1> {
    return await this.client.hmset(key, data)
  }

  public async setrange(
    key: IORedis.KeyType,
    offset: number,
    value: any
  ): Promise<number> {
    return await this.client.setrange(key, offset, value)
  }

  public async del(...keys: IORedis.KeyType[]): Promise<number> {
    return await this.client.del(...keys)
  }

  public async incr(key: IORedis.KeyType): Promise<number> {
    return await this.client.incr(key)
  }

  public async lrange(
    key: IORedis.KeyType,
    start: number,
    stop: number
  ): Promise<any> {
    return await this.client.lrange(key, start, stop)
  }

  public async keys(pattern: string): Promise<string[]> {
    return this.client.keys(pattern)
  }

  public async exec(): Promise<any> {
    await this.client.exec()
  }

  public async flushall(): Promise<string> {
    return await this.client.flushall()
  }

  public async sort(key: IORedis.KeyType, ...args: string[]): Promise<any> {
    return await this.client.sort(key, ...args)
  }

  public async patterndel(pattern: string): Promise<any> {
    const scanOptions: IORedis.ScanStreamOption = {
      match: pattern
    }
    const stream = this.client.scanStream(scanOptions)
    stream.on('data', async (keys: string[]) => {
      if (keys.length) {
        const pipeline: IORedis.Pipeline = this.client.pipeline()
        for await (let key of keys) {
          pipeline.del(key)
        }
        pipeline.exec()
      }
    })
    stream.on('end', () => {
      return 'done'
    })
  }
}
