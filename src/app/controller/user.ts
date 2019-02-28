import { BaseController } from '../common/base_controller'
import { Context } from 'koa'
import { prefix, route, Method } from '../decorator/router'

@prefix('/users')
export class UserController extends BaseController {
  @route('/', Method.POST)
  async login(ctx: Context) {
    const params = super.deserialize(ctx.model.user.Login, ctx.request.body)
    await super.validate(ctx.model.user.Login, ctx.request.body)
    const result = await ctx.service.user.login(params)
    if (result) {
      await ctx.client.set(
        <string>result.account.username,
        JSON.stringify(result)
      )
      ctx.body = result
    } else {
      ctx.throw(401, '登录失败')
    }
  }
}
