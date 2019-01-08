import { config } from '../../config'
import * as knex from 'knex'
import { KnexConfig } from '../../typings/knex'

interface Mysql {
  host: string
  user: string
  password: string
  database: string
}

const mysql: Mysql = config.mysql

const knexConfig: KnexConfig = {
  client: 'mysql',
  connection: {
    host: mysql.host,
    user: mysql.user,
    password: mysql.password,
    database: mysql.database,
    supportBigNumbers: true,
    charset: 'utf8mb4',
    connectTimeout: 15000
  },
  pool: {
    min: 2,
    max: 10
  }
}

export class BaseService {
  knex: any
  config: Object
  constructor() {
    this.knex = knex(knexConfig)
    this.config = config
  }
}
