import * as http from 'http'
import * as Koa from 'koa'
import { SocketServer } from './websocket/index'
import { InitWSServer } from './typings'

class WSServer implements InitWSServer {
  private app = new Koa()
  public init() {
    const server = http.createServer(this.app.callback())
    SocketServer(server)

    server.listen(3000, () => {
      console.log('🚀 Server ready at ws://127.0.0.1:3000')
    })
  }
}

const wsServer = new WSServer()
wsServer.init()
