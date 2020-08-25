/* eslint-disable no-unused-vars */
'use strict'

module.exports = function productManager(options) {
  const seneca = this
  const role = 'product'
  const actionType = {
    fetch: 'fetch',
    add: 'add',
    remove: 'remove',
    edit: 'edit'
  }

  seneca.add({ role, action: 'testget' }, (args, done) => {
    console.log('product.testget >>> ')
    done(null, { msg: 'action testget >>>' })
  })

  // fetch
  seneca.add({ role, action: actionType.fetch }, (args, done) => {
    console.log('product.fetch >>> ')
    const products = this.make('products')
    const productAry = []
    // products.list$({}, done)
    products.list$({}, (err, result) => {
      if (err) {
        console.log('Error:', err)
      }
      // console.log('product.byId >>> result:', result)
      for (const prop in result) {
        if (result[prop]) {
          productAry.push({
            name: result[prop].name,
            category: result[prop].category,
            description: result[prop].description,
            price: result[prop].price
          })
        }
      }
      done(null, { data: productAry, total_items: productAry.length })
    })
  })

  // byCategory
  seneca.add({ role, action: actionType.fetch, criteria: 'byCategory' }, (args, done) => {
    console.log('product.byCategory >>> ')
    const products = this.make('products')
    products.list$({ category: args.category }, done)
  })

  // byId
  seneca.add({ role, action: actionType.fetch, criteria: 'byId' }, (args, done) => {
    const { id, method } = args
    console.log('product.byId >>> id:', id)
    const products = this.make('products')
    products.load$(id, (err, result) => {
      if (err) {
        console.log('Error:', err)
      } else {
        console.log('product.byId >>> result:', result)
        // done(null, result)
        if (method === 'get') {
          let data = {
            name: result.name,
            category: result.category,
            description: result.description,
            price: result.price
          }
          done(null, { data: data })
        } else {
          done(null, result)
        }
      }
    })
  })

  // add
  seneca.add({ role, action: actionType.add }, (args, done) => {
    const products = this.make('products')
    const data = args.request
    console.log('product.add args >>> ', data)
    products.category = data.category
    products.name = data.name
    products.description = data.description
    products.price = data.price
    products.save$((err, product) => {
      done(err, products.data$(false))
    })
  })

  // remove
  seneca.add({ role, action: actionType.remove }, (args, done) => {
    console.log('product.remove >>> ')
    const { request, id } = args
    console.log('product.remove request >>> ', request)
    console.log('product.remove >>> ', id)
    const product = this.make('products')
    product.remove$(args.id, err => {
      done(err, { deleted_id: id })
    })
  })

  // edit
  seneca.add({ role, action: actionType.edit }, (args, done) => {
    const { request, id } = args
    console.log('product.edit request >>> ', request)
    console.log('product.edit updated name >>> ', request.name)
    console.log('product.edit >>> ', id)
    seneca.act(
      {
        role,
        action: actionType.fetch,
        criteria: 'byId',
        id
      },
      (err, result) => {
        if (err) {
          console.log('ERROR edit:', err)
        }
        if (result) {
          result.data$({
            name: (request.name || result.name),
            category: (request.category || result.category),
            description: (request.description || result.description),
            price: (request.price || result.price)
          })

          result.save$((saveErr, product) => {
            done(err || saveErr, product.data$(false))
          })
        }
      }
    )
  })
}
