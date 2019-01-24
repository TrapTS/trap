import { Middleware, InitServer, InitWSServer } from '../typings'
import * as Koa from 'koa'
import * as http from 'http'
import { SocketServer } from '../websocket'

export class Server implements InitServer {
  private app = new Koa()

  public bindToContext<T>(name: string, func: T): T {
    return (this.app.context[name] = func)
  }

  public use(middleware: Middleware) {
    return this.app.use(middleware)
  }

  public async start(port: number): Promise<void> {
    await this.app.listen(port, () => {
      console.info('Application is listening port:', port)
    })
  }
}

export class WSServer implements InitWSServer {
  private app = new Koa()
  public async start(port: number): Promise<void> {
    const server = http.createServer(this.app.callback())
    await SocketServer(server)
    server.listen(port, () => {
      console.log(`🚀 Server ready at ws://127.0.0.1:${port}`)
    })
  }
}