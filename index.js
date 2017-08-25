/* @flow */
/* :: import type {RendererType, OptionsType, NotificationType} from './types' */

const path = require('path')
let juice
try {
  juice = require('juice')
} catch (error) {
  juice = null
}

function resolveObjectProperties (globalResolve /* : Function */, promiseObject /* : {[string]: Promise<any>} */) {
  Promise.all(Object.keys(promiseObject).map((key) => {
    return new Promise((resolve) => {
      promiseObject[key].then((promise) => resolve({key, promise}))
    })
  })).then((keyPromises) => globalResolve(keyPromises.reduce((acc, keyPromise) => {
    acc[keyPromise.key] = keyPromise.promise
    return acc
  }, {})))
}

function render (renderer /* : RendererType */, chunk /* : any */, data /* : Object */) /* : Promise<any> */ {
  return new Promise((resolve) => {
    if (typeof chunk === 'string') {
      Promise.resolve(renderer(chunk, data)).then(resolve)
    } else if (Array.isArray(chunk)) {
      Promise.all(chunk.map((value) => render(renderer, value, data))).then(resolve)
    } else if (chunk !== null && typeof chunk === 'object') {
      resolveObjectProperties(resolve, Object.keys(chunk).reduce((acc, key) => {
        acc[key] = render(renderer, chunk[key], data)
        return acc
      }, {}))
    } else {
      resolve(chunk)
    }
  })
}

const templates = {}
function getTemplateFromName (templateName /* : string */, folder /* : string */) {
  if (!templates[templateName]) {
    const getTemplate = require(`${path.resolve(folder, templateName)}`)
    templates[templateName] = getTemplate()
  }
  return Promise.resolve(templates[templateName])
}

function inlineCss (notif /* : NotificationType */, juiceOptions /* : $PropertyType<OptionsType, 'juice'> */) {
  if (juice && juiceOptions !== false && notif && notif.channels && notif.channels.email && notif.channels.email.html) {
    notif.channels.email.html = juice(notif.channels.email.html, Object.assign({}, {removeStyleTags: false}, juiceOptions))
  }
  return notif
}

module.exports = (renderer /* : RendererType */, folder /* : string */, options /* : OptionsType */ = {}) => {
  return (templateName /* : string */, data /* : Object */) /* : Promise<NotificationType> */ => {
    return new Promise((resolve) => {
      getTemplateFromName(templateName, folder).then((template) => {
        render(renderer, template, data).then((notification) => {
          resolve(inlineCss(notification, options.juice))
        })
      })
    })
  }
}
