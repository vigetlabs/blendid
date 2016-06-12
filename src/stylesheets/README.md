# Stylesheet Assets (Sass)
Sass is the greatest, and libsass (via node-sass) is the fastest! Put your Sass here. 

If you're using the Icon Font task, a `generated` folder containing `_icons.sass` will be automatically created. Be sure to `@import generated/icons` in `app.sass`.

I've provided a web font mixin in `base/mixins.sass` for use with any fonts you may include.

[Normalize.css](https://github.com/necolas/normalize.css) is also installed and `@import`'d by default, mostly as an example of how to include css from `node_modules`.

### Tasks and Files
```
gulpfile.js/tasks/css
```
Your Sass gets run through Autoprefixer, so don't prefix! The examples use the indented `.sass` syntax, but use whichever you prefer. In the `production` task, output is minified with [cssnano](https://github.com/ben-eb/cssnano).

You may also provide additional [`node-sass` options](https://github.com/sass/node-sass#options) to the `sass` property in css task config in `config.json`. By default, i've enabled `indentedSyntax` and added the path to normalize.css via the `includePaths` option. See #190 for details.
