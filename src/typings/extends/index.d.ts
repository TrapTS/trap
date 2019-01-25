import { IModel } from '../app/model'

export interface Helper {
  service: {
    get: () => Object
  }
  model: {
    get: () => IModel
  }
}
