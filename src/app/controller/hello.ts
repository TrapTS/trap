import { prefix, route, Method } from '../decorator/router'
import { Context } from 'koa'
import { roles } from '../common/role'
import { BaseController } from '../common/base_controller'

@prefix('/hello')
export class Hello extends BaseController {
  @route('/', Method.GET, roles('admin'))
  async index(ctx: Context): Promise<void> {
    ctx.body = await ctx.service.hello.index('Hello World')
  }
}
