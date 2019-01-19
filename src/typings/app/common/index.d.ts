import * as Knex from 'knex'
import { Config } from '../../config'

export class EntityService {
  public knex: Knex
  public config: Config
  public error(code: number, message: string): void
}
