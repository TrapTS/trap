import * as socket from 'socket.io'
import * as dir from 'dir_filenames'
import { isPlainObject } from 'lodash'
import { Socket } from './types'
import { resolve } from 'path'

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

        const files: string[] = dir(resolve(__dirname, './normal'))
        files.map(file => {
          const socketObj: Object = require(file)
          for (let i in socketObj) {
            const socketInfo: Socket = socketObj[i]
            if (isPlainObject(socketInfo)) {
              if (socketInfo.type === 'ON' && !socketInfo.channel) {
                throw new Error('Socket type is ON, channel required!!!')
              }
              if (socketInfo.type === 'EMIT' && !socketInfo.channel) {
                throw new Error('Socket type is EMIT, channel required!!!')
              }
              if (socketInfo.type === 'ON' && socketInfo.channel) {
                console.info('type: on, start at: ' + Date.now())
                socket.on(socketInfo.channel, socketInfo.options)
              }
              if (socketInfo.type === 'EMIT' && socketInfo.channel) {
                console.info('type: emit, start at: ' + Date.now())
                socket.emit(socketInfo.channel, socketInfo.options)
              }
              if (socketInfo.type === 'RAW') {
                if (typeof socketInfo.options === 'function') {
                  console.info('type: raw, start at: ' + Date.now())
                  const rawFunc: Function = socketInfo.options
                  rawFunc(socket)
                }
              }
              if (socketInfo.logger) {
                console.info(
                  JSON.stringify({
                    wsEngine: 'ws',
                    header: JSON.stringify(socket.conn.request.headers),
                    url: socket.conn.request.url,
                    method: socket.conn.request.method
                  })
                )
              }
            }
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
