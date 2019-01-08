import * as http from 'http'
import * as Koa from 'koa'
import { SocketServer } from './websocket/index'

const app: any = new Koa()
const server = http.createServer(app.callback())
SocketServer(server)

server.listen(3000, () => {
  console.log('🚀 Server ready at ws://127.0.0.1:3000')
})
