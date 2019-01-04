export interface Config {
  env?: string
  appRoot?: string
  port: number
  mysql: Mysql
  amqp_url?: string
}

interface Mysql {
  host: string
  user: string
  password: string
  database: string
}
