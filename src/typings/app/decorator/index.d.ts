export type Prefix = (
  path: string
) => (target: any, _key?: string | symbol, _descriptor?: any) => void
export type Route = (
  path: string,
  method: any
) => (target: any, _key?: string | symbol, descriptor?: any) => void
