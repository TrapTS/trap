import * as amqp from 'amqplib'
import * as path from 'path'
import * as dir from 'dir_filenames'
import { ReceiveRabbitMQ } from '../typings'
import { config } from '../config'
import { Channel, Connection, Options, ConsumeMessage, Message } from 'amqplib'

const connect: Options.Connect = {
  hostname: '118.24.62.50',
  port: 5672,
  username: 'rabbitmq',
  password: 'rabbitmq'
}

const url: string | Options.Connect = config.amqp_url
  ? config.amqp_url
  : connect

const files: string[] = dir(path.resolve(__dirname, './receive'))

const receiveMessage: Function = async (receive: ReceiveRabbitMQ) => {
  const connection: Connection = await amqp.connect(url)
  console.info('connect to RabbitMQ success!!!')
  try {
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue(receive.chananel)
    await channel.consume(
      receive.chananel,
      async (message: ConsumeMessage | null) => {
        const operateFunc: Function = receive.task
        operateFunc(message)
        channel.ack(message as Message)
      }
    )

    connection.on(
      'error',
      (err): void => {
        console.log(err)
        setTimeout(receiveMessage(receive), 10000)
      }
    )

    connection.on(
      'close',
      (): void => {
        console.error('RabbitQM connection closed!')
        setTimeout(receiveMessage(receive), 10000)
      }
    )
  } catch (err) {
    console.log(err)
    setTimeout(receiveMessage(receive), 1000)
  }
}

files.map(file => {
  const receiveModule: Object = require(file)
  for (let i in receiveModule) {
    const receive: ReceiveRabbitMQ = receiveModule[i]
    receiveMessage(receive)
  }
})
