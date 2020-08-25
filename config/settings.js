'use strict'

const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  PORT: process.env.MICRO_PRODUCT_PORT || 3001,
  PRODUCT_SVC: {
    HOST: '127.0.0.1',
    PORT: '3010'
  },
  MONGO: {
    HOST: '127.0.0.1',
    PORT: '27017',
    DB: 'seneca_product_db'
  }
}
