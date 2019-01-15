import * as Koa from 'koa'
import { IService } from './app/service'
import { IModel } from './app/model'
import { Config } from './config'

declare module 'koa' {
  interface Context extends Koa.BaseContext {
    model: IModel
    service: IService
    config: Config
  }
}
