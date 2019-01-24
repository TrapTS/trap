import { Server } from 'jayson/promise'

const server: Server = new Server({
  add: async (args: number[]) => {
    return args[0] + args[1]
  }
})

server.tcp().listen(3000, () => {
  console.log('Application is listening port: 3000')
})
