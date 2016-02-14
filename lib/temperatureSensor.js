const dht = require('node-dht-sensor')

module.exports = function create() {
  dht.initialize(22, 20)
  return function read () {
    return dht.read()
  }
}
