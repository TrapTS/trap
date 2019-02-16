import { config } from '../../config'
import { ApiErrorException } from './exceptions'
import { EntityService, Config } from '../../typings'
export abstract class BaseService implements EntityService {
  config: Config
  constructor() {
    this.config = config
  }

  public error(code: number, message: string): void {
    throw new ApiErrorException(message, code)
  }
}
