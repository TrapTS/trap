import { readdirSync } from 'fs'
import { db } from './index'
import { isPlainObject, union } from 'lodash'
import { config } from '../config'
import { join } from 'path'
import { AddColumn, Migration } from '../typings'
import { Operation } from '../typings/migrations/operation'

let tasks: Function[] = []

const appRoot = config.appRoot
readdirSync(`${appRoot}/migrations/operation`).map(file => {
  let migrations: Migration[] = require(join(
    `${appRoot}/migrations/operation`,
    file
  ))(db)
  const funcArray: Function[] = []
  migrations.map(migration => {
    if (isPlainObject(migration) && migration.opt === Operation.create) {
      return funcArray.push(async () => {
        const exists: boolean = await db.schema.hasTable(<string>(
          migration.table
        ))
        if (!exists) {
          return db.schema.createTable(<string>migration.table, t => {
            for (let i in migration.column) {
              let columns = migration.column
              if (i === 'id') {
                t[columns[i].type]()
              } else {
                if (
                  columns[i].type === 'float' ||
                  columns[i] === 'double' ||
                  columns[i].type === 'decimal'
                ) {
                  t[columns[i].type](i, columns[i].precision, columns[i].scale)
                    .defaultTo(columns[i].default)
                    .comment(columns[i].comment)
                } else if (
                  columns[i].type === 'string' ||
                  columns[i].type === 'varchar' ||
                  columns[i].type === 'char'
                ) {
                  t[columns[i].type](i, columns[i].length)
                    .defaultTo(columns[i].default)
                    .comment(columns[i].comment)
                } else {
                  t[columns[i].type](i)
                    .defaultTo(columns[i].default)
                    .comment(columns[i].comment)
                }
              }
            }
          })
        }
      })
    }
    if (isPlainObject(migration) && migration.opt === Operation.addColumn) {
      return funcArray.push(async () => {
        const exists: boolean = await db.schema.hasColumn(
          <string>migration.table,
          <string>migration.field
        )
        if (!exists) {
          return db.schema.table(<string>migration.table, t => {
            let column
            const operate = migration as AddColumn
            if (
              operate.content.type === 'string' ||
              operate.content.type === 'varchar' ||
              operate.content.type === 'char'
            ) {
              column = t[operate.content.type](
                operate.field,
                operate.content.length
              )
            } else if (
              operate.content.type === 'float' ||
              operate.content.type === 'double' ||
              operate.content.type === 'decimal'
            ) {
              column = t[operate.content.type](
                operate.field,
                operate.content.precision,
                operate.content.scale
              )
            } else {
              column = t[operate.content.type](operate.field)
            }
            if (operate.content.default)
              column.defaultTo(operate.content.default)
            if (operate.content.comment) column.comment(operate.content.comment)
            if (operate.content.after) column.after(operate.content.after)
          })
        }
      })
    }
    if (isPlainObject(migration) && migration.opt === Operation.dropColumn) {
      return funcArray.push(async () => {
        const exists: boolean = await db.schema.hasColumn(
          <string>migration.table,
          <string>migration.from_column
        )
        if (exists) {
          return db.schema.table(<string>migration.table, t =>
            t.renameColumn(
              <string>migration.from_column,
              <string>migration.to_column
            )
          )
        }
      })
    }
    if (isPlainObject(migration) && migration.opt === Operation.renameColumn) {
      return funcArray.push(async () => {
        const exists: boolean = await db.schema.hasColumn(
          <string>migration.table,
          <string>migration.from_column
        )
        if (exists) {
          return db.schema.table(<string>migration.table, t =>
            t.renameColumn(
              <string>migration.from_column,
              <string>migration.to_column
            )
          )
        }
      })
    }
    if (isPlainObject(migration) && migration.opt === Operation.renameTable) {
      return funcArray.push(async () => {
        const exists: boolean = await db.schema.hasTable(<string>(
          migration.from_table
        ))
        if (exists) {
          return db.schema.renameTable(
            <string>migration.from_table,
            <string>migration.to_table
          )
        }
      })
    }
    if (isPlainObject(migration) && migration.opt === Operation.raw) {
      return funcArray.push(async () => {
        return db.schema.raw(<string>migration.sql)
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
