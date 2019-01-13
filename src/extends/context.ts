import { Helper } from '../typings/extends'
import { sendToQueue } from '../rabbitmq/send'

export const helper: Helper = {
  sendToQueue: {
    get: sendToQueue
  }
}
