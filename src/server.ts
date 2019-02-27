import server from './app'
import { config } from './config'

const bootstrap = () => {
  server.start(config.port)
}

bootstrap()
