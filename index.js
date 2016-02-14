const lightSensor = require('./lib/lightSensor')
const temperatureSensor = require('./lib/temperatureSensor')

const readLight = lightSensor()
const readTemperature = temperatureSensor(20)

setInterval(() => console.log(readLight()), 500)
setInterval(() => console.log(readTemperature()), 2000)
