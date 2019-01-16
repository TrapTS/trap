export interface SendRabbitMQ {
  queue: string
  data: Buffer
  persistent?: Boolean
}

export interface ReceiveRabbitMQ {
  chananel: string
  task: (message) => any
}
