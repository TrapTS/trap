import * as socket from 'socket.io'
import { config } from '../config'
import * as dir from 'dir_filenames'
import { isPlainObject } from 'lodash'

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
            if (isPlainObject(socketObj[i])) {
              if (!socketObj[i].type || !socketObj[i].options)
                throw new Error('Socket module mast have type and options!!!')
              if (socketObj[i].type === 'ON' && socketObj[i].channel) {
                console.info('type: on, start at: ' + Date.now())
                socket.on(socketObj[i].channel, socketObj[i].options)
              }
              if (socketObj[i].type === 'EMIT' && socketObj[i].channel) {
                console.info('type: emit, start at: ' + Date.now())
                socket.emit(socketObj[i].channel, socketObj[i].options)
              }
              if (socketObj[i].type === 'RAW') {
                console.info('type: raw, start at: ' + Date.now())
                const rawFunc: Function = socketObj[i].options
                rawFunc(socket)
              }
              if (socketObj[i].logger) {
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
