export interface ReceiveRabbitMQ {
  chananel: string
  task: (message) => any
}

export type SendMessageFunc = (queue: string, message: string) => void
