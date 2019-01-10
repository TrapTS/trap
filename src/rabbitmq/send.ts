import * as amqp from 'amqplib'
import * as dir from 'dir_filenames'
import * as path from 'path'
import { SendRabbitMQ } from '../typings/rabbitmq'

const files: string[] = dir(path.resolve(__dirname, './send'))

files.map(file => {
  const sendModule: Object = require(file)
  for(let i in sendModule) {
    const send: SendRabbitMQ = sendModule[i]
    sendMessage(send)
  }
})

const sendMessage: Function = async (send: SendRabbitMQ) => {
  const connection = await amqp.connect(send.url)
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
