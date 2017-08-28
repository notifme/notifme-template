const nunjucks = require('nunjucks')
const NotifmeSdk = require('notifme-sdk').default
const getRenderer = require('..')

// Renderer (Example with nunjucks)
nunjucks.configure({autoescape: false})
const render = getRenderer(nunjucks.renderString, 'example/templates')

// Notif.me sender
const notifmeSdk = new NotifmeSdk({
  useNotificationCatcher: true
})

// Render a template and send it
const data = {
  smsFrom: 'Notifme',
  emailFrom: '"David, Notif.me team" <david@example.com>',
  user: {
    firstname: 'John',
    email: 'john@example.com',
    phone: '+15000000001',
    pushToken: 'xxxxx',
    webpush: {
      endpoint: 'xxxxx',
      keys: {
        auth: 'xxxxx',
        p256dh: 'xxxxx'
      }
    }
  }
}

// Multi-channels example
render('welcome-multi-channels', data).then((notification) => {
  // Then select channels...
  // (you can do things like: if push or webpush exists, then don't send an SMS)
  notifmeSdk.send(notification.channels)
})

// Simple multi-channels example
render('welcome-simple', data).then((notification) => {
  notifmeSdk.send(notification.channels)
})

// Localized example
render('welcome-localized-simple', data, 'fr').then((notification) => {
  notifmeSdk.send(notification.channels)
})

// Example with a CSS preprocessor
render('welcome-css-preprocessor', data).then((notification) => {
  notifmeSdk.send(notification.channels)
})
