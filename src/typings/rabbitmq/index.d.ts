import { Options } from 'amqplib'

export interface SendRabbitMQ {
  queue: string
  data: Buffer
  options: Options.Publish
}

export interface ReceiveRabbitMQ {
  chananel: string
  task: (message) => any
}
