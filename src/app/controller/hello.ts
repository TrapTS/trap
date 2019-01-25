import { prefix, route, Method } from '../decorator/router'
import { Context } from 'koa'
import { roles } from '../common/role'

@prefix('/hello')
export class Hello {
  @route('/', Method.GET, roles('admin'))
  async index(ctx: Context): Promise<void> {
    ctx.body = 'Hello World'
  }
}
