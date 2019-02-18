import { BaseController } from '../common/base_controller'
import { Context } from 'koa'
import { prefix, route, Method } from '../decorator/router'

@prefix('/users')
export class UserController extends BaseController {
  @route('/', Method.POST)
  async login(ctx: Context) {
    const params = super.deserialize(ctx.model.user.Login, ctx.request.body)
    await super.validate(ctx.model.user.Login, ctx.request.body)
    ctx.body = await ctx.service.user.login(params, ctx.client)
  }
}
