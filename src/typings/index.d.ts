import * as Koa from 'koa'
import { IService } from './app/service'
import { IModel } from './app/model'
import { Config } from './config'

declare module 'koa' {
  interface Request extends Koa.BaseRequest {
    body: Object
  }

  interface Context extends Koa.BaseContext {
    model: IModel
    service: IService
    config: Config
    request: Request
    sendMessage(queue: string, message: string)
  }
}

export class InitServer {
  public initMiddleware(): void
  public start(): void
}

export class InitWSServer {
  public init(): void
}
