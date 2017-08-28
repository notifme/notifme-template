/* @flow */
/* :: import type {TemplateType} from '../../../types' */

const path = require('path')
const readFile = require('../../util').readFile

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
  return readFile(path.join(__dirname, _('email-template', lang)))
    .then((emailHtml) => constructWelcomeTemplate(lang, emailHtml))
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
