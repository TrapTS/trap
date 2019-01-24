import { ReceiveRabbitMQ } from '../../typings'
import { ConsumeMessage } from 'amqplib'

export const test: ReceiveRabbitMQ = {
  chananel: 'Hello',
  task: (message: ConsumeMessage | null) => {
    if (!message) throw new Error('message is null!!')
    console.log(message.content.toString())
  }
}
