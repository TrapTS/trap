const amqp = require('amqplib')

const queue: string = 'Hello'

const helloWorld: Function = async () => {
  const connection = await amqp.connect('amqp://47.74.234.5:5672')
  console.info('connect to RabbitMQ success')
  try {
    const channel = await connection.createChannel()
    await channel.assertQueue(queue)
    await channel.consume(queue, async (message) => {
      console.log(message.content.toString())
      channel.ack(message)
    })

    connection.on('error', (err) => {
      console.log(err)
      setTimeout(helloWorld(), 10000)
    })

    connection.on('close', () => {
      console.error('connection to RabbitQM closed!')
      setTimeout(helloWorld(), 10000)
    })
  } catch (err) {
    console.error(err)
    setTimeout(helloWorld(), 10000)
  }
}

helloWorld()
