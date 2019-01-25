import { Context } from 'koa'
import { Middleware } from '../../typings'

export const roles = (options: string | string[]): Middleware => {
  return async function role(ctx: Context, next) {
    if (typeof options === 'string') options = [options]
    if (ctx.session) {
      if (options.includes(ctx.session.user.role as string)) {
        await next()
      } else {
        ctx.throw(401, 'Permission denied')
      }
    } else {
      ctx.throw(403, 'Restricted access')
    }
  }
}
