import { Config } from '../typings'

export const config: Config = {
  mysql: {
    host: '106.15.230.136',
    user: 'lvyang',
    password: 'zhazhayang',
    database: 'test'
  },
  redis: {
    host: '106.15.230.136',
    port: 6379,
    password: 'alfieri',
    db: 2
  },
  port: 4000,
  amqp_url: 'amqp://rabbitmq:rabbitmq@118.24.62.50:5672'
}
