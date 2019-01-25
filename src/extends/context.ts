import { Helper } from '../typings'
import * as dir from 'dir_filenames'
import { resolve } from 'path'

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
  }
}
