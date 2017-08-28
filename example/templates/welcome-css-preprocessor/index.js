/* @flow */
/* :: import type {TemplateType} from '../../../types' */

const sass = require('node-sass')
const path = require('path')
const readFile = require('../../util').readFile

function getCss (file) {
  return new Promise((resolve, reject) => {
    sass.render({file}, (error, result) => {
      error ? reject(error) : resolve(result.css.toString('utf8'))
    })
  })
}

function getTemplate () {
  return Promise.all([
    readFile(path.join(__dirname, './email.html')),
    getCss(path.join(__dirname, './email.scss'))
  ]).then(([emailHtml, emailScss]) =>
    constructWelcomeTemplate(`{% set extracss = "${emailScss}" %}\n\n${emailHtml}`)
  )
}

function constructWelcomeTemplate (emailHtml) /* : TemplateType */ {
  return {
    name: 'welcome-css-preprocessor',
    title: 'Welcome {{user.firstname}}',
    version: 1,
    channels: {
      email: {
        from: '{{emailFrom}}',
        to: '{{user.email}}',
        subject: '[CSS] Welcome {{user.firstname}}',
        html: emailHtml
      }
    },
    sampleData: {
      emailFrom: '"David, Notif.me team" <david@example.com>',
      user: {
        firstname: 'John',
        email: 'john@example.com'
      }
    }
  }
}

module.exports = getTemplate
