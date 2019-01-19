import { ReceiveRabbitMQ } from '../../typings'

export const test: ReceiveRabbitMQ = {
  chananel: 'Hello',
  task: message => {
    console.log(message.content.toString())
  }
}
