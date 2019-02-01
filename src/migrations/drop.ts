import { readdirSync } from 'fs'
import { join } from 'path'
import { isPlainObject, union } from 'lodash'
import { db } from './index'
import { Operation } from '../typings/migrations/operation'
import { Migration } from '../typings'

let tasks: Function[] = []
readdirSync(join('./operation')).map(file => {
  let migrations: Migration[] = require(join(__dirname, file))(db)
  let funcArray: Function[] = []
  migrations.map(migration => {
    if (isPlainObject(migration) && migration.opt === Operation.drop) {
      return funcArray.push(() => {
        return db.schema.dropTable(<string>migration.table)
      })
    }
  })
  tasks = union(tasks, funcArray)
})

const schedule = async () => {
  for await (let task of tasks) {
    task()
  }
  process.exit()
}

schedule()
