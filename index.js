/* eslint-disable no-unused-vars */
'use strict'

const seneca = require('seneca')()
const SenecaWeb = require('seneca-web')
const express = require('express')
const bodyParser = require('body-parser')
const expressAdapter = require('seneca-web-adapter-express')
const entities = require('seneca-entity')

const api = require('./plugins/api')
const config = require('./config/settings')

const port = config.PORT
const app = express()

app.use(bodyParser.json())

seneca
  .use(SenecaWeb, {
    // routes,
    context: app,
    adapter: expressAdapter,
    options: { parseBody: false }
  })
  .use(api)
  .ready(err => {
    if (err) throw err
    const server = seneca.export('web/context')()

    server.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`)
    })
  })
