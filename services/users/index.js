const kafka = require('node-rdkafka')

const KAFKA_BROKER_LIST = process.env.KAFKA_BROKER_LIST

const producer = new kafka.Producer({
  'metadata.broker.list': KAFKA_BROKER_LIST,
})

const producerWriteStream = producer.getWriteStream('test')

function formatError(error) {
  return error.stack || error.message || error
}

producerWriteStream.on('error', (error) => {
  console.log(`Write Stream Error: ${formatError(error)}`)
})

function sendMessage() {
  console.log('sendMessage')

  const success = producerWriteStream.write(new Buffer('Awzum'))

  console.log('sendMessage success')

  if (!success) {
    // TODO: What to do?
    process.nextTick(sendMessage)
  }
}

sendMessage()
