import { Middleware } from 'koa'
import { SessionOptions } from 'koa-generic-session'
import { config } from '../config'
import * as redisStore from 'koa-redis'
import * as session from 'koa-generic-session'

const sessionOption: SessionOptions = {
  prefix: 'sess:',
  store: redisStore({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password || '',
    db: config.redis.db || 0
  }),
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
    signed: true
  }
}
export const redisSession: Middleware = session(sessionOption)
