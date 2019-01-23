import * as jayson from 'jayson'

const server: jayson.Server = new jayson.Server({
  add: function(args, callback) {
    callback(null, args[0] + args[1])
  }
})

server.tcp().listen(3000, () => {
  console.log('Application is listening port: 3000')
})
