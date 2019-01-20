import { prefix, route, Method } from '../decorator/router'
import { Context } from 'koa'

@prefix('/hello')
export class Hello {
  @route('/', Method.GET)
  async index(ctx: Context): Promise<void> {
    ctx.body = 'Hello World'
  }
}
