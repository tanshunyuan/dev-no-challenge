const pino = require('pino');
const pretty_config = {
  transport:{
    target:'pino-pretty'
  }
}
const pino_config = process.env.NODE_ENV === 'development' ? pretty_config : {}
module.exports = pino(pino_config)
