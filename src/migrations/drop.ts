import { readdirSync } from 'fs'
import { join } from 'path'
import { union } from 'lodash'
import { db } from './index'
import { Migration } from './types'
import { Operation } from './enum'

let tasks: Function[] = []
readdirSync(join(__dirname, './operation')).map(file => {
  let migrations = require(join(__dirname, './operation/' + file))
  let funcArray: Function[] = []
  for (let i in migrations) {
    const migration: Migration = migrations[i]
    if (migration.opt === Operation.drop) {
      funcArray.push(() => {
        return db.schema.dropTable(<string>migration.table)
      })
    }
  }
  tasks = union(tasks, funcArray)
})

const schedule = async () => {
  for await (let task of tasks) {
    await task()
  }
  console.log('sync db done!')
  process.exit()
}

schedule()
