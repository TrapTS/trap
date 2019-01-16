import * as path from 'path'
import { Config } from '../typings/config'
import * as Knex from 'knex'

let env: string = process.argv[2]
if (!env) env = 'default'
const configPath: string = path.join(__dirname, '../config', `${env}.config.ts`)
const config: Config = require(configPath).config

const knexConfig: Knex.Config = {
  client: 'mysql',
  connection: {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    supportBigNumbers: true,
    charset: 'utf8mb4',
    connectTimeout: 15000
  }
}

export const db: Knex = Knex(knexConfig)
