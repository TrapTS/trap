import * as amqp from 'amqplib'
import { config } from '../config'
import { SendRabbitMQ } from '../typings/rabbitmq'

const sendMessage: Function = async (send: SendRabbitMQ) => {
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
        setTimeout(sendMessage(), 1000)
      }
    )
    connection.on(
      'close',
      (): void => {
        console.log('RabbitQM connection closed!!!')
        setTimeout(sendMessage(), 1000)
      }
    )
  } catch (err) {
    console.log(err)
    setTimeout(sendMessage(), 1000)
  }
}
