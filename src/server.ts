import 'reflect-metadata'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import { config } from './config'

const app: any = new Koa()

if (process.env.NODE_ENV === 'development') {
  app.use(logger())
}
app.use(bodyParser())

if (!module.parent) {
  app.listen(config['port'], () => {
    console.log(`Server ready at http://localhost:${config['port']}`)
  })
}

export default app
