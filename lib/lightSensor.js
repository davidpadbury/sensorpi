/**
 * Heavily "inspired" by python-tsl2591
 * https://github.com/maxlklaxl/python-tsl2591/blob/master/tsl2591/read_tsl.py
 **/
const i2c = require('i2c-bus')

const ADDR = 0x29
const DEVICE_ID_VALUE = 0x50
const DEVICE_RESET_VALUE = 0x80
const COMMAND = 0x80
const NORMAL_OP = 0x20
const ENABLE_RW  = COMMAND | NORMAL_OP | 0x00
const CONFIG_RW  = COMMAND | NORMAL_OP | 0x01
const AILTL_RW   = COMMAND | NORMAL_OP | 0x04
const AILTH_RW   = COMMAND | NORMAL_OP | 0x05
const AIHTL_RW   = COMMAND | NORMAL_OP | 0x06
const AIHTH_RW   = COMMAND | NORMAL_OP | 0x07
const NPAILTL_RW = COMMAND | NORMAL_OP | 0x08
const NPAILTH_RW = COMMAND | NORMAL_OP | 0x09
const NPAIHTL_RW = COMMAND | NORMAL_OP | 0x0A
const NPAIHTH_RW = COMMAND | NORMAL_OP | 0x0B
const PERSIST_RW = COMMAND | NORMAL_OP | 0x0C
const PID_R   = COMMAND | NORMAL_OP | 0x11
const ID_R  = COMMAND | NORMAL_OP | 0x12
const STATUS_R  = COMMAND | NORMAL_OP | 0x13
const C0DATAL_R = COMMAND | NORMAL_OP | 0x14
const C0DATAH_R = COMMAND | NORMAL_OP | 0x15
const C1DATAL_R  = COMMAND | NORMAL_OP | 0x16
const C1DATAH_R = COMMAND | NORMAL_OP | 0x17
const TIME100MS = 0x01
const GAINLOW = 0x00

module.exports = function create () {
  const i2c1 = i2c.openSync(1)
  // set timing
  i2c1.writeByteSync(ADDR, CONFIG_RW, TIME100MS)
  // set gain
  i2c1.writeByteSync(ADDR, CONFIG_RW, GAINLOW)
  disable()

  return function read () {
    enable()
    const ir = i2c1.readWordSync(ADDR, C1DATAL_R)
    const full = i2c1.readWordSync(ADDR, C0DATAL_R)

    return { ir, full }
  }

  function disable () {
    i2c1.writeByteSync(ADDR, ENABLE_RW, 0)
  }

  function enable () {
    i2c1.writeByteSync(ADDR, ENABLE_RW, STATUS_R)
  }
}
