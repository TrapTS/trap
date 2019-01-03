import * as fs from 'fs'
import * as _ from 'lodash'
import { db } from './index'
global.Promise = require('bluebird')
import { config } from '../config'
import * as path from 'path'

const appRoot = config.appRoot
fs.readdirSync(`${appRoot}/migrations/operation`).map(file => {
  let migrations = require(path.join(`${appRoot}/migrations/operation`, file))(db)
  const funcArray: Function[] = []
  migrations.map(migration => {
    if (_.isPlainObject && migration.opt === 'create') {
      return funcArray.push(async () => {
        const exists = await db.schema.hasTable(migration.table)
        if (!exists) {
          return db.schema.createTable(migration.table, t => {
            for (let i in migration.column) {
              let columns = migration.column
              if (i === 'id') {
                t[columns[i].type]()
              } else {
                if (columns[i].type === 'float' || columns[i] === 'double' || columns[i].type === 'decimal') {
                  t[columns[i].type](i, columns[i].precision, columns[i].scale).defaultTo(columns[i].default).comment(columns[i].comment)
                } else if (columns[i].type === 'string' || columns[i].type === 'varchar' || columns[i].type === 'char') {
                  t[columns[i].type](i, columns[i].length).defaultTo(columns[i].default).comment(columns[i].comment)
                } else {
                  t[columns[i].type](i).defaultTo(columns[i].default).comment(columns[i].comment)
                }
              }
            }
          })
        }
      })
    }
  })
})
