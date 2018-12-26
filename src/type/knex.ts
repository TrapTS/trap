export interface KnexConfig {
  client: string
  connection: Connection
  pool: Pool
}

interface Connection {
  host: string
  user: string
  password: string
  database: string
}

interface Pool {
  min: number,
  max: number
}
