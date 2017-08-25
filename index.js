const nunjucks = require('nunjucks')
const getWelcomeTemplate = require('./examples/welcome')

nunjucks.configure({autoescape: false})
function myRenderer (chunk, data) {
  return nunjucks.renderString(chunk, data)
}

function resolveObjectProperties (globalResolve, promiseObject) {
  Promise.all(Object.keys(promiseObject).map((key) => {
    return new Promise((resolve) => {
      promiseObject[key].then((promise) => resolve({key, promise}))
    })
  })).then((keyPromises) => globalResolve(keyPromises.reduce((acc, keyPromise) => {
    acc[keyPromise.key] = keyPromise.promise
    return acc
  }, {})))
}

function render (chunk, data) {
  return new Promise((resolve) => {
    if (typeof chunk === 'string') {
      Promise.resolve(myRenderer(chunk, data)).then(resolve)
    } else if (Array.isArray(chunk)) {
      Promise.all(chunk.map((value) => render(value, data))).then(resolve)
    } else if (chunk !== null && typeof chunk === 'object') {
      resolveObjectProperties(resolve, Object.keys(chunk).reduce((acc, key) => {
        acc[key] = render(chunk[key], data)
        return acc
      }, {}))
    } else {
      resolve(chunk)
    }
  })
}

Promise.resolve(getWelcomeTemplate()).then((template) => {
  render(template, template.sampleData).then((notification) => {
    console.log(notification)
  })
})
