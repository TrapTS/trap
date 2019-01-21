import 'reflect-metadata'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import { config } from './config'
import { loadControllers } from './app/decorator/router'
import { sendMessage } from './rabbitmq/send'
import { InitServer } from './typings'
import { classSchedule } from './schedule'
import { Cache } from './cache'
import { Middleware } from 'koa'
import { RedisCache } from './cache/redisCache'

class Server implements InitServer {
  private app = new Koa()

  initMiddleware(): void {
    classSchedule()
  }

  bindToContext<T>(name: string, func: T) {
    return this.app.context[name] = func
  }

  use(arg: Middleware) {
    return this.app.use(arg)
  }

  async start(): Promise<void> {
    await this.app.listen(config.port, () => {
      console.info('Application is listening port:', config.port)
    })
  }
}

(() => {
  const server = new Server()
  server.initMiddleware()
  server.bindToContext('sendMessage', sendMessage)
  server.bindToContext('cache', new Cache({ stdTTL: 86400000 }))
  server.bindToContext('client', new RedisCache({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password || '',
    db: config.redis.db
  }))
  if (config.env === 'development') {
    server.use(logger())
  }
  server.use(bodyParser())

  const router = loadControllers()
  server.use(router.routes())
  server.use(router.allowedMethods())
  server.start()
})()
