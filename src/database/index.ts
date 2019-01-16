import { config } from '../config'
import * as Knex from 'knex'
import { Mysql } from '../typings/database'

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

const knex: Knex = Knex(knexConfig)

export default knex
