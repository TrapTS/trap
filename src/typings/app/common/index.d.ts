export interface KnexConfig {
  client: string
  connection: Connection
  pool?: Pool
}

interface Connection {
  host: string
  user: string
  password: string
  database: string
  supportBigNumbers: boolean
  charset: string
  connectTimeout: number
}

interface Pool {
  min: number
  max: number
}
