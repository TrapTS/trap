import 'reflect-metadata'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import { config } from './config'
import { loadControllers } from './app/decorator/router'
import { sendMessage } from './rabbitmq/send'
import { InitServer } from './typings'

class Server implements InitServer {
  private app = new Koa()

  initMiddleware() {
    this.app.context.sendMessage = sendMessage
    if (config.env === 'development') {
      this.app.use(logger())
    }
    this.app.use(bodyParser())

    const router = loadControllers()
    this.app.use(router.routes())
    this.app.use(router.allowedMethods())
  }

  async start() {
    await this.app.listen(config.port, () => {
      console.info('Application is listening port:', config.port)
    })
  }
}

const server = new Server()
server.initMiddleware()
server.start()
