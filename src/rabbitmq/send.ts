import * as amqp from 'amqplib'
import { config } from '../config'
import { SendMessageFunc } from '../typings/rabbitmq'
import { Channel, Connection, Options } from 'amqplib'

const connect: Options.Connect = {
  hostname: '118.24.62.50',
  port: 5672,
  username: 'rabbitmq',
  password: 'rabbitmq'
}

const url: string | Options.Connect = config.amqp_url
  ? config.amqp_url
  : connect

export const sendMessage: SendMessageFunc = async (
  queue: string,
  message: string
) => {
  const connection: Connection = await amqp.connect(url)
  const channel: Channel = await connection.createChannel()
  await channel.assertQueue(queue)
  const options: Options.Publish = {
    persistent: true
  }
  await channel.sendToQueue(queue, Buffer.from(message), options)
}
