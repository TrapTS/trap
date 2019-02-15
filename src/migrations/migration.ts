import { readdirSync } from 'fs'
import { db } from './index'
import { union } from 'lodash'
import { join } from 'path'
import { AddColumn, Migration } from './types'
import { Operation } from './enum'

let tasks: Function[] = []

readdirSync(join(__dirname, './operation')).map(file => {
  let migrations = require(join(__dirname, './operation/' + file))
  const funcArray: Function[] = []
  for (let i in migrations) {
    const migration: Migration = migrations[i]
    if (migration.opt === Operation.create) {
      console.log('------>', migration)
      funcArray.push(async () => {
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
    if (migration.opt === Operation.addColumn) {
      funcArray.push(async () => {
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
    if (migration.opt === Operation.dropColumn) {
      funcArray.push(async () => {
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
    if (migration.opt === Operation.renameColumn) {
      funcArray.push(async () => {
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
    if (migration.opt === Operation.renameTable) {
      funcArray.push(async () => {
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
    if (migration.opt === Operation.raw) {
      funcArray.push(async () => {
        return db.schema.raw(<string>migration.sql)
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
