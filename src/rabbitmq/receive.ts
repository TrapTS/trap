import * as amqp from 'amqplib'
import * as path from 'path'
import * as dir from 'dir_filenames'
import { ReceiveRabbitMQ } from '../typings/rabbitmq'
import { config } from '../config'

const files: string[] = dir(path.resolve(__dirname, './receive'))

const receiveMessage: Function = async (receive: ReceiveRabbitMQ) => {
  const connection: any = await amqp.connect(config.amqp_url)
  console.info('connect to RabbitMQ success!!!')
  try {
    const channel: any = await connection.createChannel()
    await channel.assertQueue(receive.chananel)
    await channel.consume(receive.chananel, async message => {
      const operateFunc: Function = receive.task
      operateFunc(message)
      channel.ack(message)
    })

    connection.on(
      'error',
      (err): void => {
        console.log(err)
        setTimeout(receiveMessage(), 10000)
      }
    )

    connection.on(
      'close',
      (): void => {
        console.error('RabbitQM connection closed!')
        setTimeout(receiveMessage(), 10000)
      }
    )
  } catch (err) {
    console.log(err)
    setTimeout(receiveMessage(), 1000)
  }
}

files.map(file => {
  const receiveModule: Object = require(file)
  for (let i in receiveModule) {
    const receive: ReceiveRabbitMQ = receiveModule[i]
    receiveMessage(receive)
  }
})
