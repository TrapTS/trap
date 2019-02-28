import server from './app'
import { config } from './config'
import { schedule } from '@trapts/schedule'
import { resolve } from 'path'

const bootstrap = () => {
  schedule(resolve(__dirname, './schedule/classcronjob'))
  server.start(config.port)
}

bootstrap()
