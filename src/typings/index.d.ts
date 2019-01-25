import * as Koa from 'koa'
import { IService } from './app/service'
import { IModel } from './app/model'
import { Config } from './config'
import {
  CronSchedule,
  Schedule,
  ClassSchedule,
  EntitySchedule,
  EntitySubcription
} from './schedule'
import { ReceiveRabbitMQ, SendMessageFunc } from './rabbitmq'
import {
  Migration,
  CreateTable,
  Drop,
  Raw,
  RenameTable,
  RenameColumn,
  DropColumn,
  AddColumn
} from './migrations'
import { Helper } from './extends'
import { Mysql } from './database'
import { EntityService } from './app/common'
import { CacheStatus, BaseCache, Cache, RedisCache } from './cache'

declare module 'koa' {
  interface Request extends Koa.BaseRequest {
    body: Object
  }

  interface Context extends Koa.BaseContext {
    session: Session | null
    model: IModel
    service: IService
    config: Config
    request: Request
    sendMessage(queue: string, message: string)
    cache: Cache
    client: RedisCache
  }
}

export class InitServer {
  public bindToContext<T>(name: string, func: T): T
  public keys(args: string[]): any
  public use(middleware: Middleware): any
  public start(port: number): void
}

export class InitWSServer {
  public start(port: number): Promise<void>
}

export type Middleware = (ctx: Koa.Context, next?: any) => any | Promise<any>

export {
  CronSchedule,
  Schedule,
  ClassSchedule,
  EntitySchedule,
  EntitySubcription,
  ReceiveRabbitMQ,
  SendMessageFunc,
  Migration,
  CreateTable,
  AddColumn,
  DropColumn,
  RenameColumn,
  RenameTable,
  Raw,
  Drop,
  Helper,
  Mysql,
  Config,
  EntityService,
  IModel,
  IService,
  CacheStatus,
  BaseCache
}
