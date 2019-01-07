import * as amqp from 'amqplib'
import { config } from '../config'
const queue: string = 'Hello'

const helloWorld: Function = async () => {
  const connection: any = await amqp.connect(config.amqp_url)
  console.info('connect to RabbitMQ success')
  try {
    const channel: any = await connection.createChannel()
    await channel.assertQueue(queue)
    await channel.consume(queue, async message => {
      console.log(message.content.toString())
      channel.ack(message)
    })

    connection.on(
      'error',
      (err): void => {
        console.log(err)
        setTimeout(helloWorld(), 10000)
      }
    )

    connection.on(
      'close',
      (): void => {
        console.error('connection to RabbitQM closed!')
        setTimeout(helloWorld(), 10000)
      }
    )
  } catch (err) {
    console.error(err)
    setTimeout(helloWorld(), 10000)
  }
}

helloWorld()
