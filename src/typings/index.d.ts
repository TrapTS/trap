import * as Koa from 'koa'
import { IService } from './app/service'
import { IModel } from './app/model'
import { Config } from './config'
import { SendRabbitMQ } from './rabbitmq'

declare module 'koa' {
  interface Request extends Koa.BaseRequest {
    body: Object
  }

  interface Context extends Koa.BaseContext {
    model: IModel
    service: IService
    config: Config
    request: Request
  }
}
