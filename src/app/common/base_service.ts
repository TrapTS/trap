import { config } from '../../config'
import * as Knex from 'knex'
import knex from '../../database'
export class BaseService {
  knex: Knex
  config: Object
  constructor() {
    this.knex = knex
    this.config = config
  }
}
