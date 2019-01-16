import { ReceiveRabbitMQ } from "../../typings/rabbitmq";

export const test: ReceiveRabbitMQ = {
    chananel: 'Hello',
    task: (message) => {
      console.log(message.content.toString())
    }
}