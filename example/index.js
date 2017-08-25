const nunjucks = require('nunjucks')
const NotifmeSdk = require('notifme-sdk').default
const getRenderer = require('..')

// Renderer
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
    pushToken: 'xxxxx'
  }
}
render('welcome', data).then((notification) => {
  notifmeSdk.send(notification.channels)
})
