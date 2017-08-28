/* @flow */
/* :: import type {TemplateType} from '../../../types' */

const fs = require('fs')
const path = require('path')

const l10n = {
  'email-template': {
    en: './email-en.html',
    fr: './email-fr.html'
  },
  'email.subject': {
    en: '[EN] Welcome {{user.firstname}}',
    fr: '[FR] Bienvenue {{user.firstname}}'
  }
}
function _ (key, lang) {
  return l10n[key] ? l10n[key][lang] || l10n[key][Object.keys(l10n[key])[0]] : ''
}

function getTemplate (lang /* : string */) {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, _('email-template', lang)), (error, emailHtml) => {
      error ? reject(error) : resolve(constructWelcomeTemplate(lang, emailHtml.toString('utf8')))
    })
  })
}

function constructWelcomeTemplate (lang, emailHtml) /* : TemplateType */ {
  return {
    name: 'welcome-localized-simple',
    title: 'Welcome {{user.firstname}}',
    version: 1,
    channels: {
      email: {
        from: '{{emailFrom}}',
        to: '{{user.email}}',
        subject: _('email.subject', lang),
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
