import * as socket from 'socket.io'
import { config } from '../config'
import * as dir from 'dir_filenames'
import * as _ from 'lodash'

class Server {
  io: any
  constructor(httpServer) {
    this.io = socket(httpServer, {
      serveClient: false,
      wsEngine: 'ws'
    })
    this._handleEvents()
  }

  _handleEvents(): void {
    this.io.on(
      'connection',
      (socket): void => {
        console.log('User connected!!   ' + 'id: ' + socket.id)

        const files: string[] = dir(`${config.appRoot}/src/socket`)
        _.remove(files, n => {
          return n === `${config.appRoot}/src/socket/index.ts`
        })
        files.map(file => {
          const socketObj = require(file)
          for (let i in socketObj) {
            if (!_.isPlainObject(socketObj[i]))
              throw new Error('Socket configure mast be Object!!!')
            if (
              !socketObj[i].type ||
              !socketObj[i].channel ||
              !socketObj[i].options
            )
              throw new Error(
                'Socket module mast have type, channel and options!!!'
              )
            if (socketObj[i].type === 'ON')
              socket.on(socketObj[i].channel, socketObj[i].options)
            if (socketObj[i].type === 'EMIT')
              socket.emit(socketObj[i].channel, socketObj[i].options)
          }
        })

        socket.on('disconnect', () => {
          console.log('id: ' + socket.id + '   disconnected!!')
        })
      }
    )
  }
}

export const SocketServer: Function = httpServer => {
  return new Server(httpServer)
}

export enum TypeList {
  emit = 'EMIT',
  on = 'ON'
}

export interface Socket {
  type: TypeList
  channel: string
  options: Function | Object
}
