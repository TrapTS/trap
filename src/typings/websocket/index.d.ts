export enum TypeList {
  emit = 'EMIT',
  on = 'ON',
  raw = 'RAW'
}

export interface Socket {
  type: TypeList
  channel?: string
  logger?: boolean
  options: Function | Object
}
