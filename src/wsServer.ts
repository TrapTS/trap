import * as http from 'http'
import * as Koa from 'koa'
import { SocketServer } from './websocket/index'
import { InitWSServer } from './typings'

class WSServer implements InitWSServer {
  private app = new Koa()
  public async start(port: number): Promise<void> {
    const server = http.createServer(this.app.callback())
    await SocketServer(server)
    server.listen(port, () => {
      console.log(`🚀 Server ready at ws://127.0.0.1:${port}`)
    })
  }
}

const wsServer = new WSServer()
wsServer.start(3000)
