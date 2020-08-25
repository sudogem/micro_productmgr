'use strict'

const seneca = require('seneca')()
const entities = require('seneca-entity')
const config = require('../config/settings')

const productManager = require('../plugins/productManager')

const PRODUCT_SVC_HOST = config.PRODUCT_SVC.HOST
const PRODUCT_SVC_PORT = config.PRODUCT_SVC.PORT
const MONGO_HOST = config.MONGO.HOST
const MONGO_PORT = config.MONGO.PORT
const MONGO_DB = config.MONGO.DB

seneca
  .use(entities, { mem_store: false })
  .use('mongo-store', {
    uri: `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`
  })
  .use(productManager)
  .listen({ host: PRODUCT_SVC_HOST, port: PRODUCT_SVC_PORT }, () => {
    console.log(`Server is listening on http://${PRODUCT_SVC_HOST}:${PRODUCT_SVC_PORT}`)
  })
