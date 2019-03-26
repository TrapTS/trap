import { Config } from '../typings'

export const config: Config = {
  mysql: {
    host: '127.0.0.1',
    user: 'root',
    password: 'trap12',
    database: 'trap-dev',
    port: 3319
  },
  redis: {
    host: '127.0.0.1',
    port: 6399,
    password: 'alfieri',
    db: 2
  },
  port: 4000,
  amqp_url: 'amqp://rabbitmq:rabbitmq@118.24.62.50:5672'
}
