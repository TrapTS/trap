import 'reflect-metadata'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import { config } from './config'
import { loadControllers } from './app/decorator/router'
import { sendMessage } from './rabbitmq/send'
import { classSchedule } from './schedule'
import { Cache } from './cache'
import { RedisCache } from './cache/redisCache'
import { Server } from './extends'
import { redisSession, cors } from './extends/application'

const server = new Server()
classSchedule()
server.bindToContext('sendMessage', sendMessage)
server.bindToContext('cache', new Cache({ stdTTL: 86400000 }))
server.bindToContext(
  'client',
  new RedisCache({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password || '',
    db: config.redis.db
  })
)
server.bindToContext('config', config)
if (config.env === 'development') {
  server.use(logger())
}
server.use(bodyParser())

server.keys(['Hello', 'World'])
server.use(redisSession)
server.use(cors)

const router = loadControllers()
server.use(router.routes())
server.use(router.allowedMethods())

export default server
