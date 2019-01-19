import * as Koa from 'koa'
import { IService } from './app/service'
import { IModel } from './app/model'
import { Config } from './config'
import { TypeList, Socket } from './websocket'
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
import { Prefix, Route } from './app/decorator'
import { CacheStatus, BaseCache, Cache } from './cache'

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
    cache: Cache
  }
}

export class InitServer {
  public initMiddleware(): void
  public start(): void
}

export class InitWSServer {
  public init(): void
}

export {
  TypeList,
  Socket,
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
  Prefix,
  Route,
  IModel,
  IService,
  CacheStatus,
  BaseCache
}
