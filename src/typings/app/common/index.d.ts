import { Config } from '../../config'

export { EntityService }

declare class EntityService {
  public config: Config
  public error(code: number, message: string): void
}
