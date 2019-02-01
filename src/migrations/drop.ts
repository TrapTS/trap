import { readdirSync } from 'fs'
import { join } from 'path'
import { isPlainObject, union } from 'lodash'
import { db } from './index'
import { Migration } from './types'
import { Operation } from './enum'

let tasks: Function[] = []
readdirSync(join(__dirname, './operation')).map(file => {
  let migrations = require(join(__dirname, './operation/' + file))(db)
  let funcArray: Function[] = []
  for (let i in migrations) {
    const migration: Migration = migrations[i]
    if (isPlainObject(migration) && migration.opt === Operation.drop) {
      funcArray.push(() => {
        return db.schema.dropTable(<string>migration.table)
      })
    }
  }
  tasks = union(tasks, funcArray)
})

const schedule = async () => {
  for await (let task of tasks) {
    console.log('sync db done!')
    await task()
  }
  process.exit()
}

schedule()
