import { config } from '../../config'
import * as Knex from 'knex'
import knex from '../../database'
import { ApiErrorException } from './exceptions'
import { EntityService, Config } from '../../typings'
export abstract class BaseService implements EntityService {
  knex: Knex
  config: Config
  constructor() {
    this.knex = knex
    this.config = config
  }

  public error(code: number, message: string): void {
    throw new ApiErrorException(message, code)
  }
}
