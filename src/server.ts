import 'reflect-metadata'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import { config } from './config'
import { loadControllers } from './app/decorator/router'

const app: any = new Koa()

if (config.env === 'development') {
  app.use(logger())
}
app.use(bodyParser())

const router = loadControllers()
app.use(router.routes())
app.use(router.allowedMethods())

if (!module.parent) {
  app.listen(config.port, () => {
    console.log(`Server ready at http://localhost:${config.port}`)
  })
}

export default app
