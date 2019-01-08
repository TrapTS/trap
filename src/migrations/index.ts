import { KnexConfig } from '../typings/knex'
import * as knex from 'knex'
import * as path from 'path'

let env: string = process.argv[2]
if (!env) env = 'default'
const configPath: string = path.join(__dirname, '../config', `${env}.config.ts`)
const config: Object = require(configPath).config

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

export const db: any = knex(knexConfig)
