import * as Router from 'koa-router'
import * as dir from 'dir_filenames'
import { Prefix, Route } from '../../typings'

const router = new Router({
  prefix: '/v1'
})

export enum Method {
  HEAD,
  OPTIONS,
  GET,
  PUT,
  PATCH,
  POST,
  DELETE,
  ALL
}

export const prefix: Prefix = (path: string = '') => {
  return (target: any, _key?: string | symbol, _descriptor?: any): void => {
    prefixUpdateRoute(target, path)
  }
}

export const route: Route = (path: string, method: Method) => {
  return (target: any, _key?: string | symbol, descriptor?: any): void => {
    routeUpdate(target, method, path, descriptor)
  }
}

const prefixUpdateRoute = (target: any, path: string): void => {
  if (!target.prototype.router) {
    target.prototype.router = new Router()
  }
  router.use(path, target.prototype.router.routes())
  router.use(path, target.prototype.router.allowedMethods())
}

const routeUpdate = (target: any, method: Method, path: string, descriptor?: any) => {
  if (!target.router) {
    target.router = new Router()
  }
  switch (method) {
    case Method.HEAD:
      target.router.head(path, descriptor.value)
      break
    case Method.OPTIONS:
      target.router.options(path, descriptor.value)
      break
    case Method.GET:
      target.router.get(path, descriptor.value)
      break
    case Method.PATCH:
      target.router.patch(path, descriptor.value)
      break
    case Method.PUT:
      target.router.put(path, descriptor.value)
      break
    case Method.POST:
      target.router.post(path, descriptor.value)
      break
    case Method.DELETE:
      target.router.del(path, descriptor.value)
      break
    case Method.ALL:
      target.router.all(path, descriptor.value)
      break
    default:
      throw new Error('@route decorator "method" is not valid')
  }
}

export const loadControllers = () => {
  const files: string[] = dir(`${process.env.PWD}/src/app/controller`)
  files.map(file => {
    require(file)
  })
  return router
}
