export interface SendRabbitMQ {
  url: string
  queue: string
  data: Buffer
  persistent?: Boolean
}

export interface ReceiveRabbitMQ {
  url: string
  chananel: string
  task: Function
}
