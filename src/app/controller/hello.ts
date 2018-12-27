import { prefix, route, Method } from "../decorator/router"
import { Context } from 'koa'

class Hehe {
  id: number
  name: string
}

@prefix('/hello')
export class Hello {
  @route('/', Method.GET)
  async index (ctx: Context): Promise<void> {
    ctx.body = 'Hello World'
  }
}
