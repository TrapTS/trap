import * as jayson from 'jayson/promise'

const server: jayson.Server = new jayson.Server({
  add: async (args: number[]) => {
    return args[0] + args[1]
  }
})

server.tcp().listen(3000, () => {
  console.log('Application is listening port: 3000')
})
