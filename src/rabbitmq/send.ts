import * as amqp from 'amqplib'
import { config } from '../config'
import { SendRabbitMQ } from '../typings/rabbitmq'

export const sendToQueue: Function = async (send: SendRabbitMQ) => {
  const connection = await amqp.connect(config.amqp_url)
  console.info('connect to RabbitMQ success!!!')
  try {
    const channel: any = await connection.createChannel()
    await channel.assertQueue(send.queue)
    await channel.sendToQueue(send.queue, send.data, {
      persistent: send.persistent
    })
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
  const connection = await amqp.connect(config.amqp_url)
  const channel = await connection.createChannel()
  await channel.assertQueue(queue)
  await channel.sendToQueue(queue, Buffer.from(message), {
    persistent: true
  })
}
