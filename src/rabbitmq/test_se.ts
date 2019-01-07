import * as amqp from 'amqplib'
import { config } from '../config'

const queue: string = 'Hello'

const helloWorld: Function = async () => {
  const connection: any = await amqp.connect(config.amqp_url)
  console.info('RabbitMQ success!!!')
  try {
    const channel: any = await connection.createChannel()
    await channel.assertQueue(queue)
    await channel.sendToQueue(queue, Buffer.from('Hello World'), {
      persistent: true
    })
    connection.on('error', err => {
      console.log(err)
      setTimeout(helloWorld(), 1000)
    })
    connection.on('close', () => {
      console.log('RabbitQM closed!!!')
      setTimeout(helloWorld(), 1000)
    })
  } catch (err) {
    console.error(err)
    setTimeout(helloWorld(), 1000)
  }
}

helloWorld()
