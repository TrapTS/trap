import { Helper, IModel } from '../typings'
import * as dir from 'dir_filenames'
import { resolve } from 'path'

const models: string[] = dir(resolve(__dirname, '../app/models'))
const services: string[] = dir(resolve(__dirname, '../app/services'))

export const helper: Helper = {
  service: {
    get: () => {
      let service: Object
      service = {}
      services.map(file => {
        const items: Object = require(file)
        for (let item in items) {
          const name: string = item.replace(/\Service/, '').toLocaleLowerCase()
          service[name] = require(file)[item].prototype
        }
      })
      return service
    }
  },
  model: {
    get: () => {
      let model: Object
      model = {}
      models.map(file => {
        let dirArr: string[] = file.split('/')
        let popDir = dirArr.pop() as string
        let name: string = popDir.replace(/\.\w+$/, '')
        model[name] = require(file)
      })
      return model as IModel
    }
  }
}
