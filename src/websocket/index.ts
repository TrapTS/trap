import * as socket from 'socket.io'
import { config } from '../config'
import * as dir from 'dir_filenames'
import { isPlainObject } from 'lodash'
import { Socket } from './types'

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

        const files: string[] = dir(`${config.appRoot}/src/websocket/normal`)
        files.map(file => {
          const socketObj: Object = require(file)
          for (let i in socketObj) {
            const socketInfo: Socket = socketObj[i]
            if (isPlainObject(socketInfo)) {
              if (!socketInfo.type || !socketInfo.options)
                throw new Error('Socket module mast have type and options!!!')
              if (socketInfo.type === 'ON' && socketInfo.channel) {
                console.info('type: on, start at: ' + Date.now())
                socket.on(socketInfo.channel, socketInfo.options)
              }
              if (socketInfo.type === 'EMIT' && socketInfo.channel) {
                console.info('type: emit, start at: ' + Date.now())
                socket.emit(socketInfo.channel, socketInfo.options)
              }
              if (socketInfo.type === 'RAW') {
                console.info('type: raw, start at: ' + Date.now())
                if (typeof socketInfo.options === 'function') {
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
