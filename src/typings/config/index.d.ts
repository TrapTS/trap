export interface Config {
  env?: string
  appRoot?: string
  port: number
  mysql: Mysql
  amqp_url?: string
  redis: Redis
}

interface Mysql {
  host: string
  user: string
  password: string
  database: string
}

interface Redis {
  host: string
  port: number
  password: string
  db: number
}
