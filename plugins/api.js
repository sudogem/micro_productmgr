/* eslint-disable no-unused-vars */
'use strict'

const config = require('../config/settings')
const ROUTES = require('../helpers/routes')

module.exports = function api(options) {
  const seneca = this
  const role = 'ui'
  const actions = {
    list: 'list',
    load: 'load',
    update: 'update',
    create: 'create',
    delete: 'delete'
  }

  const senecaProductManager = seneca.client({
    host: config.PRODUCT_SVC.HOST,
    port: config.PRODUCT_SVC.PORT
  })

  const routes = ROUTES

  seneca.add('init:api', (msg, respond) => {
    seneca.act('role:web', { routes }, respond)
  })

  // list
  seneca.add({ role, action: actions.list }, (args, done) => {
    senecaProductManager.act(
      {
        role: 'product',
        action: 'fetch'
      }, (err, result) => {
        if (err) {
          console.log('ERROR products:', err)
        }
        console.log('fetch all >>> ', result)
        done(err, { msg: 'Successfully fetch all the records.', result })
      })
  })

  // load
  seneca.add({ role, action: actions.load }, (args, done) => {
    const paramsId = args.request$.params.id
    const method = args.request$.method.toLowerCase()
    console.log('method:', args.request$.method)
    console.log('productById id: >>> ', paramsId)
    senecaProductManager.act(
      {
        role: 'product',
        action: 'fetch',
        criteria: 'byId',
        id: paramsId,
        method: method
      },
      (err, result) => {
        if (err) {
          console.log('ERROR productById:', err)
        }
        // done(err, { msg: 'productById result >>>' })
        done(err, { msg: 'Successfully fetch a record.', result })
      }
    )
  })

  // update
  seneca.add({ role, action: actions.update }, (args, done) => {
    const paramsId = args.request$.params.id
    console.log('update id >>> ', paramsId)
    console.log('update request$ >>> ', args.request$.body)
    const requestItem = args.request$.body.name
    console.log('update name: >>> ', requestItem)
    senecaProductManager.act(
      {
        role: 'product',
        action: 'edit',
        id: paramsId,
        request: args.request$.body
      },
      (err, result) => {
        if (err) {
          console.log('ERROR update:', err)
        }
        console.log('update result >>> ', result)
        done(err, { msg: 'Sucessfully updated.' })
      }
    )
  })

  // create
  seneca.add({ role, action: actions.create }, (args, done) => {
    console.log('create request$ >>> ', args.request$.body)
    const requestItem = args.request$.body.name
    console.log('create name: >>> ', requestItem)
    senecaProductManager.act(
      {
        role: 'product',
        action: 'add',
        request: args.request$.body
      },
      (err, result) => {
        if (err) {
          console.log('ERROR create:', err)
        }
        done(err, { msg: 'Successfully created.', result })
      }
    )
  })

  // delete
  seneca.add({ role, action: actions.delete }, (args, done) => {
    const paramsId = args.request$.params.id
    console.log('delete method:', args.request$.method)
    console.log('delete id: >>> ', paramsId)
    senecaProductManager.act(
      {
        role: 'product',
        action: 'remove',
        id: paramsId
      },
      (err, result) => {
        if (err) {
          console.log('ERROR productById:', err)
        }
        // done(err, { msg: 'productById result >>>' })
        done(err, { msg: 'Successfully delete a record.', result })
      }
    )
  })

  // gettest
  seneca.add({ role, action: 'gettest' }, (args, done) => {
    senecaProductManager.act({ role: 'product', action: 'testget' }, (err, result) => {
      console.log('testget: >>> ', args.request$.body)
      done(err, { msg: 'testget >>>', result })
    })
  })
}
