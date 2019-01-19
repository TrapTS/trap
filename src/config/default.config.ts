import { Config } from '../typings'

export const config: Config = {
  mysql: {
    host: '106.15.230.136',
    user: 'lvyang',
    password: 'zhazhayang',
    database: 'test'
  },
  port: 4000,
  amqp_url: 'amqp://rabbitmq:rabbitmq@118.24.62.50:5672'
}
