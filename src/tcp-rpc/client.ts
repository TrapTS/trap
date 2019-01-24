import { Client } from 'jayson/promise'

const options = {
  port: 3000
}

const client = Client.tcp(options)

const demo = async () => {
  const result = await client.request('add', [1, 2])
  console.log('------>', result)
}

demo()
