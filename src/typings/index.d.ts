import * as Koa from 'koa'
import { Config } from './config'
import { IService } from './app/service'

export interface Context extends Koa.Context {
  sendToQueue?: any
  config?: Config
  service?: IService
}
