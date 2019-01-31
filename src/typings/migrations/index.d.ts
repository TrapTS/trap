import { Operation } from './operation'

export interface Migration {
  opt: Operation
  table?: string
  column?: Object
  field?: string
  content?: Object
  from_column?: string
  to_column?: string
  from_table?: string
  to_table?: string
  sql?: string
}

export interface CreateTable {
  opt: Operation
  table: string
  column: Object
}

export interface AddColumn {
  opt: Operation
  table: string
  field: string
  content: Content
}

interface Content {
  type: string
  length?: number
  precision?: number
  scale?: string
  default?: any
  comment?: string
  after?: string
}

export interface DropColumn {
  opt: Operation
  table: string
  field: string
}

export interface RenameColumn {
  opt: Operation
  from_column: string
  to_column: string
}

export interface RenameTable {
  opt: Operation
  from_table: string
  to_table: string
}

export interface Raw {
  opt: Operation
  sql: string
}

export interface Drop {
  opt: Operation
  table: string
}
