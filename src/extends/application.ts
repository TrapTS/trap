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

export const cors: Middleware = async (ctx, next) => {
  if (ctx.request.method === 'OPTIONS') {
    ctx.response.status = 200
  }
  ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin)
  ctx.set('Access-Control-Allow-Credentials', 'true')
  ctx.set('Access-Control-Max-Age', '86400000')
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
  ctx.set(
    'Access-Control-Allow-Headers',
    'x-requested-with, accept, origin, content-type'
  )
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      code: ctx.status,
      message: err.message,
      stack: err.stack
    }
  }
}
