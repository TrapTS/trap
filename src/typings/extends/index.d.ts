export interface Helper {
  sendToQueue: SendToQueue
}

interface SendToQueue {
  get: Function
}
