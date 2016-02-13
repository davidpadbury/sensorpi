const lightSensor = require('./lib/lightSensor')

const readLight = lightSensor()

setInterval(() => console.log(readLight()), 500)
