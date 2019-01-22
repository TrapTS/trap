import { TypeList, Socket } from '../types'

export const test: Socket = {
  type: TypeList.on,
  channel: 'aaa',
  logger: true,
  options: (from: string, msg: string): void => {
    console.log('MSG', from, ' saying ', msg)
  }
}

function hello(): Object {
  return {
    msg: 'MESSAGE'
  }
}

export const test2: Socket = {
  type: TypeList.emit,
  channel: 'ddd',
  logger: true,
  options: hello()
}
