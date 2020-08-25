'use strict'

const role = 'ui'

module.exports = [
  {
    prefix: '/api',
    pin: `role:${role}, action:*`,
    map: {
      list: { GET: true, name: '', alias: '/api/product' },
      load: { GET: true, name: '', alias: '/api/product/:id', suffix: '/:id' },
      update: { PUT: true, name: '', alias: '/api/product/:id', suffix: '/:id' },
      create: { POST: true, name: '', alias: '/api/product' },
      delete: { DELETE: true, name: '', alias: '/api/product/:id', suffix: '/:id' }
    }
  }, {
    prefix: '/api',
    pin: `role:${role}, action:*`,
    map: {
      gettest: { GET: true }
    }
  }
]

