import * as jayson from 'jayson'

const client: jayson.Client = jayson.Client.tcp({
  port: 3000
})

client.request('add', [1, 2], (err, res) => {
  if (err) throw err
  console.log('------>', res)
})
