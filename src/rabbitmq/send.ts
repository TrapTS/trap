import * as amqp from 'amqplib'
import { config } from '../config'
import { SendRabbitMQ } from '../typings/rabbitmq'
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

export const sendToQueue: Function = async (send: SendRabbitMQ) => {
  const connection: Connection = await amqp.connect(url)
  console.info('connect to RabbitMQ success!!!')
  try {
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue(send.queue)
    await channel.sendToQueue(send.queue, send.data, send.options)
    connection.on(
      'error',
      (err): void => {
        console.log(err)
        setTimeout(sendToQueue(), 1000)
      }
    )
    connection.on(
      'close',
      (): void => {
        console.log('RabbitQM connection closed!!!')
        setTimeout(sendToQueue(), 1000)
      }
    )
  } catch (err) {
    console.log(err)
    setTimeout(sendToQueue(), 1000)
  }
}

export const sendMessage: Function = async (queue: string, message: string) => {
  const connection = await amqp.connect(url)
  const channel = await connection.createChannel()
  await channel.assertQueue(queue)
  const options: Options.Publish = {
    persistent: true
  }
  await channel.sendToQueue(queue, Buffer.from(message), options)
}
