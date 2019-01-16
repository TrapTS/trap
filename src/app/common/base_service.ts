import { config } from '../../config'
import * as Knex from 'knex'
import { Mysql } from '../../typings/app/common'

const mysql: Mysql = config.mysql

const knexConfig: Knex.Config = {
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
  knex: Knex
  config: Object
  constructor() {
    this.knex = Knex(knexConfig)
    this.config = config
  }
}
