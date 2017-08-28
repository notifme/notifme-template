/* @flow */
/* :: import type {TemplateType} from '../../types' */

function getTemplate () /* : TemplateType */ {
  return {
    name: 'welcome-simple',
    title: 'Welcome {{user.firstname}}',
    version: 1,
    channels: {
      sms: {
        from: '{{smsFrom}}',
        to: '{{user.phone}}',
        text: "[Simple] Hi {{user.firstname}}, we're very happy to welcome you on board!"
      },
      email: {
        from: '{{emailFrom}}',
        to: '{{user.email}}',
        subject: '[Simple] Welcome {{user.firstname}}',
        html: `{% extends "example/templates/_layouts/email-transactional.html" %}
          {% block content %}
          Hi {{user.firstname}},<br><br>
          We're very happy to welcome you on board.<br><br>
          See you soon!
          {% endblock %}`
      },
      push: {
        registrationToken: '{{user.pushToken}}',
        title: '[Simple] Welcome {{user.firstname}}',
        body: "Hi {{user.firstname}}, we're very happy to welcome you on board"
      },
      webpush: {
        subscription: {
          endpoint: '{{user.webpush.endpoint}}',
          keys: {
            auth: '{{user.webpush.keys.auth}}',
            p256dh: '{{user.webpush.keys.auth}}'
          }
        },
        title: '[Simple] Welcome {{user.firstname}}',
        body: "Hi {{user.firstname}}, we're very happy to welcome you on board",
        icon: 'https://fakeimg.pl/100x100/',
        image: 'https://fakeimg.pl/400x240/',
        actions: [
          {
            action: 'share',
            title: 'Share with your friends',
            icon: 'https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/png/512/android-share.png'
          }
        ],
        requireInteraction: true,
        redirects: {
          'default': 'https://www.notif.me',
          share: 'https://www.notif.me/?click=share'
        }
      }
    },
    sampleData: {
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
  }
}

module.exports = getTemplate
