const kafka = require('kafka-node')
const ascoltatori = require('ascoltatori')

const KAFKA_HOST = process.env.KAFKA_HOST
const KAFKA_PORT = process.env.KAFKA_PORT

const kafkaOptions = {
  type: 'kafka',
  json: false,
  kafka: kafka,
  connectionString: `${KAFKA_HOST}:${KAFKA_PORT}`,
  clientId: 'ascoltatori',
  groupId: 'ascoltatori',
  defaultEncoding: 'utf8',
  encodings: {
    image: 'buffer'
  },
}

console.log('Connecting with', kafkaOptions)
ascoltatori.build(kafkaOptions, (error, pubsub) => {
  console.log('Connected!')

  pubsub.subscribe('test', () => {
    console.log('ARGUMENTS', arguments)
  })

  pubsub.publish('test', 'VALUE', () => {
    console.log('published')
  })
})
