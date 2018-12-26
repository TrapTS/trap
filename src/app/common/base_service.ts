import { config } from '../../config'
import * as knex from 'knex'
import { KnexConfig } from '../../type/knex'

const knexConfig: KnexConfig = {
  client: 'mysql',
  connection: {
    host: config['mysql'].host,
    user: config['mysql'].user,
    password: config['mysql'].password,
    database: config['mysql'].database,
    supportBigNumbers: true,
    charset: 'utf8mb4',
    connectTimeout: 15000
  }
}

class BaseService {
  knex: any
  constructor() {
    this.knex = knex(knexConfig)
  }
}
