import { ConsumeMessage } from 'amqplib'

export interface ReceiveRabbitMQ {
  chananel: string
  task: (message: ConsumeMessage | null) => any
}

export type SendMessageFunc = (queue: string, message: string) => void
