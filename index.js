const lightSensor = require('./lib/lightSensor')
const temperatureSensor = require('./lib/temperatureSensor')
const statsd = new (require('node-statsd'))()

const readLight = lightSensor()
const readTemperature = temperatureSensor(20)

setInterval(logLight, 500)
setInterval(logTemperature, 2000)

function logLight () {
  const reading = readLight()
  statsd.gauge('ir', reading.ir)
  statsd.gauge('full', reading.full)
}

function logTemperature () {
  const reading = readTemperature()
  statsd.gauge('humidity', reading.humidity)
  statsd.gauge('temperature', reading.temperature)
}
