import 'reflect-metadata'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import { config } from './config'
import { loadControllers } from './app/decorator/router'
import { sendMessage } from './rabbitmq/send'
import { Cache } from './cache'
import { Server } from './extends'
import { redisSession, cors } from './extends/application'
import * as Redis from 'ioredis'

const server = new Server()
const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password || '',
  db: config.redis.db,
  lazyConnect: true,
  enableOfflineQueue: false
})
redis.connect().catch(() => {
  throw new Error('Redis connect Error!!')
})
server.bindToContext('sendMessage', sendMessage)
server.bindToContext('cache', new Cache({ stdTTL: 86400000 }))
server.bindToContext('client', redis)
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
