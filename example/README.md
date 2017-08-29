## Examples

This folder contains examples of ways to use `notifme-template`.

`index.js` contains the code that instanciates the renderer, renders all the templates defined in the `templates` folder, and then send then to a devtool called [Notification Catcher](https://github.com/notifme/catcher).

It uses [mozilla/nunjucks](https://github.com/mozilla/nunjucks) as template engine.
Go to the [template folder](https://github.com/notifme/notifme-template/tree/master/example/templates) to check them out.


<h3>How to run</h3>

```shell
$ git clone https://github.com/notifme/notifme-template.git && cd notifme-template
$ yarn install
$ yarn run notification-catcher
$ # In a new terminal:
$ yarn run dev
$ # Open http://localhost:1080
```

You should see the [Notification Catcher](https://github.com/notifme/catcher) running:

![examples-getting-started](https://notifme.github.io/notifme-template/img/examples-getting-started.png)
