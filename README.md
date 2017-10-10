<p align="center">
  <a href="https://www.notif.me">
    <img alt="Notif.me" src="https://notifme.github.io/notifme-sdk/img/logo.png" />
  </a>
</p>

<p align="center">
  Template plugin for <a href="https://github.com/notifme/notifme-sdk">Notif.me SDK</a>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/notifme-template"><img alt="npm-status" src="https://img.shields.io/npm/v/notifme-template.svg?style=flat" /></a>
  <a href="https://github.com/standard/standard"><img alt="js-standard-style" src="https://img.shields.io/badge/codestyle-standard-brightgreen.svg?style=flat" /></a>
  <a href="https://flow.org/"><img alt="flow-typed" src="https://img.shields.io/badge/typing-Flow_Type-brightgreen.svg?style=flat" /></a>
  <a href="https://github.com/notifme/notifme-template/blob/master/LICENSE"><img alt="license" src="https://img.shields.io/badge/license-MIT_License-blue.svg?style=flat" /></a>
</p>

- [Features](#features)
- [Getting started](#getting-started)
- [How to use](#how-to-use)
- [Contributing](#contributing)
- [Need help? Found a bug?](#need-help-found-a-bug)

## Features

[![Greenkeeper badge](https://badges.greenkeeper.io/notifme/notifme-template.svg)](https://greenkeeper.io/)

* **All your notifications in one place** — Define all your `email`, `sms`, `push`, and `webpush` templates in one folder :thumbsup:

* **Choose your template engine** — `facebook/react`, `pug (formerly jade)`, `mozilla/nunjucks`, `handlebars.js`, `mustache.js`, `lodash`, `underscore`, `marko`, `doT`, `swig`, `linkedin/dustjs`, `twig.js`, `ejs`... and many more. Literally the one you want :dancer:

* **Complete control** — No magic: you define all the behaviours you need (layouts, CSS preprocessor...) :rocket:

* **No dependencies** — Lightning fast installation :zap:

* **Localization** — Easily implement i18n/l10n for all your notifications :globe_with_meridians:

* **CSS inlining** — Add [Juice](https://github.com/Automattic/juice) to your dependencies and the CSS in your emails will automatically be inlined :ribbon:

* **MIT license** — Use it like you want.

## Getting Started

```shell
$ yarn add notifme-template
```

```javascript
// Example with nunjucks template engine ($ yarn add nunjucks)
const nunjucks = require('nunjucks')
const getRenderer = require('notifme-template')

const render = getRenderer(nunjucks.renderString, './templates')

const data = {user: {firstname: 'John', email: 'john@example.com', ...}}
render('welcome', data, 'en-US').then((notification) => {
  // Send the notification on its channels
})
```

```javascript
// ./templates/welcome.js
module.exports = () => ({
  name: 'welcome',
  title: 'Welcome {{user.firstname}}',
  version: 1,
  channels: {
    sms: {
      from: '{{smsFrom}}',
      to: '{{user.phone}}',
      text: "Hi {{user.firstname}}, we're very happy to welcome you on board!"
    },
    email: {
      from: '{{emailFrom}}',
      to: '{{user.email}}',
      subject: 'Welcome {{user.firstname}}',
      html: `{% extends "templates/_layouts/email-transactional.html" %}
        {% block content %}
          Hi {{user.firstname}},<br><br>
          We're very happy to welcome you on board.<br><br>
          See you soon!
        {% endblock %}`
    },
    push: {
      registrationToken: '{{user.pushToken}}',
      title: 'Welcome {{user.firstname}}',
      body: "Hi {{user.firstname}}, we're very happy to welcome you on board"
    }
  },
  sampleData: {
    smsFrom: 'Notifme',
    emailFrom: '"David, Notif.me team" <david@example.com>',
    user: {
      firstname: 'John',
      email: 'john@example.com',
      phone: '+15000000001',
      pushToken: 'xxxxx'
    }
  }
})
```

See a [complete working example](https://github.com/notifme/notifme-template/tree/master/example) for more details.

## How to use

### Constructor options

```javascript
const getRenderer = require('notifme-template')

const render = getRenderer(/* renderer, folder, options */)
```

| Argument name | Type | Required | Description |
| --- | --- | --- | --- |
| `renderer` | `Function` | `true` | Template engine function to use. It must implement (templateName: `string`, data: `Object`) => `string` | `Promise<string>`. |
| `folder` | `string` | `true` | The path to the folder containing all [your templates](#template-declaration). |
| `options` | `Object` | `false` | See [options definition](https://github.com/notifme/notifme-template/blob/master/types.js#L6-L22). |

This returns the `render` function [documented below](#render-method).

### Template declaration

```
project/
│
└───templates/    <= you can place this folder where you want and choose its name
    │   template1.js
    │
    └───template2/
        │   index.js
```

With the structure above, you will have two templates `template1` and `template2`. `notifme-template` makes a dynamic require ``` require(`${path.resolve(folder, templateName)}`) ``` the first time you call them.

Each template must export a `function` implementing: `(lang: string) => TemplateType | Promise<TemplateType>`. See  [TemplateType definition](https://github.com/notifme/notifme-template/blob/master/types.js#L24-L119) and [examples](https://github.com/notifme/notifme-template/tree/master/example) for more details.

### `render` method

```javascript
render(/* templateName, data, lang */).then((notification) => {
  // Send the notification on its channels
})
```

| Argument name | Type | Required | Description |
| --- | --- | --- | --- |
| `templateName` | `string` | `true` | The template name to use. |
| `data` | `Object` | `true` | Data to use when rendering the notification. |
| `lang` | `string` | `false` | User language. |

This returns a `Promise` resolving with [the rendered template](https://github.com/notifme/notifme-template/blob/master/types.js#L24-L119).

## Contributing

[![js-standard-style](https://img.shields.io/badge/codestyle-standard-brightgreen.svg?style=flat)](https://github.com/standard/standard)
[![flow-typed](https://img.shields.io/badge/typing-Flow_Type-brightgreen.svg?style=flat)](https://flow.org/)

Contributions are very welcome!

To get started: [fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.

```shell
$ git clone git@github.com:[YOUR_USERNAME]/notifme-template.git && cd notifme-template
$ yarn install
```

## Need Help? Found a bug?

[Submit an issue](https://github.com/notifme/notifme-template/issues) to the project Github if you need any help.
And, of course, feel free to submit pull requests with bug fixes or changes.
