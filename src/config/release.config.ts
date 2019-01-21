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
    db: 4
  },
  port: 3001
}
