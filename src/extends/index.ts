import { Middleware, InitServer, InitWSServer } from '../typings'
import * as Koa from 'koa'
import * as http from 'http'
import { SocketServer } from '../websocket'
import { helper } from './context'

export class Server implements InitServer {
  private app = new Koa()

  constructor() {
    this.bindHelper()
  }

  bindHelper() {
    const keys: string[] = Object.keys(helper)
    keys.map(key => {
      Object.defineProperty(this.app.context, key, helper[key])
    })
  }

  public bindToContext<T>(name: string, func: T): T {
    return (this.app.context[name] = func)
  }

  public keys(args: string[]) {
    return (this.app.keys = args)
  }

  public use(middleware: Middleware) {
    return this.app.use(middleware)
  }

  public async start(port: number): Promise<void> {
    await this.app.listen(port, () => {
      console.info('Application is listening port:', port)
    })
  }

  public async callback() {
    return this.app.callback()
  }

  public pureCore() {
    Object.assign(this.app, {
      address() {
        return {
          port: 1000
        }
      }
    })
    return this.app
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
