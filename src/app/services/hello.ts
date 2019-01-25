import { BaseService } from '../common/base_service'

export class HelloService extends BaseService {
  async index(params) {
    return {
      result: params
    }
  }
}
