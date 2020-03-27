# Changelog

## 4.5.3

Adds Twig support to the HTML task.

Basic use: in `task-config.js`, set `html.templateLanguage` to `twig`.

```javascript
  html : {
    templateLanguage: 'twig',
  },
```

Advanced use: pass [`gulp-twig` options](https://github.com/zimmen/gulp-twig#options) in `task-config.js`'s `html.twig`

```javascript
html: {
  templateLanguage: 'twig',
  twig: {…},
},
```

## 4.5.2

- Adds YAML support to the HTML task. Just give your YAML `dataFile` the extension `.yaml` or `.yml`.

## 4.5.1

- Adds PostCSS support
- Autoprefixer replaces gulp-autoprefixer
- cssnano replaces gulp-cssnano

Users can configure `plugins` and `options` in `task-config.js`'s `stylesheets.postcss`. See [gulp-postcss](https://github.com/postcss/gulp-postcss) for more info.

Basic usage is unchanged. Source stylesheets will be preprocessed with Sass unless `stylesheets.sass` is `false`. You can still call out Sass explicitly if you like:

```javascript
// in task-config.js
stylesheets: true
```

A `task-config` with custom PostCSS will look like this

```javascript
// task-config.js
// must also add the dependencies (`(npm i|yarn add) some-plugin some-option`)

var somePlugin = require('some-plugin')
var someOption = require('some-option')

var postCssPlugins = [somePlugin()]
var postCssOptions = {someOption}

module.exports = {
    // ...
    stylesheets: {
        // sass: true is implied
        postcss: {
           plugins: postCssPlugins,
           options: postCssOptions
        }
    }
    // ...
}
```

Autoprefixer and cssnano are injected into the PostCSS plugins list, and do not need to be specified. However custom Autoprefixer and/or cssnano configs are respected if provided. That looks like this:

```javascript
// task-config.js
// must also add the autoprefixer dependency (`(npm i|yarn add) autoprefixer`)

var autoprefixer = require('autoprefixer')

var postCssPlugins = [
    autoprefixer({
        grid: "autoplace"
    })
]

module.exports = {
    // ...
    stylesheets: {
        // sass: true is implied
        postcss: {
           plugins: postCssPlugins
        }
    }
    // ...
}
```



## 4.5.0
Recommended security-focused upgrade:
- Dependency updates to **resolve security warnings** and resolve deprecation warnings.
- Superficial **breaking change**: the `es2015` Babel preset is no longer supported in the `task-config.js` `javascript` task. Replace `es2015` with `env`. (#573 for more information.)
- Documentation updates

## 4.4.2
- relatively references directories and files within init task

## 4.4.1
- hotfix: ensures new `fancy-log` package does not break tasks

## 4.4.0
- Prevent browserSync.server.middleware from being overwritten completely
- reorganizes production and replace file tasks to ensure public directory is cleaned on build task
- replaces outdated gulp-util with appropriate packages

## 4.3.1
- Hotfix for HTTP/2 upgrade task

## 4.3.0
- Adds an HTTP/2 assets upgrade by running `yarn run blendme -- http2-upgrade`
- Updates extras to include HTTP/2 init files

## 4.2.0
- Update dependencies, including Webpack 3
- Adds Drupal init task
- Readme updates
- Allow manually specifying the files that the `clean` task will delete via a `clean.patterns` option


## 4.1.0
- Add `devtool`, `uglifyJsPlugin`, and `definePlugin` environment options
- [Autoset `uglifyJsPlugin.sourceMap` to `true`](https://github.com/webpack/webpack/issues/2704#issuecomment-228860162) if `production.devtool` is defined
- Add `publicPath` to Craft task-config.js [#432](https://github.com/sparkinzy/blendme/issues/432)

## 4.0.1
- add watchOptions to browserSync config [#429](https://github.com/sparkinzy/blendme/pull/429)

## 4.0.0 Blendid!

- Gulp Starter is now Blendid!
- Now a standalone yarn/npm installable module :tada:
- Tasks and modules are fully configurable through task-config.js
- Paths are fully configuraable through path-config.json
- Update all dependencies to latest, including Webpack 2
- HTML and CSS tasks can be swapped out with alternative custom tasks
- Changed default Sass files from `.sass` to `.scss` 😭
- Custom gulp tasks can be added and run prebuild, postbuild, in development or production builds
- Renames javascripts `entries` option to `entry` to match Webpack config
- Removes Karma, Mocha, Sinon, Chai Test Suite. Jest is better and easy to set up. Use that instead.
- `init` task generates default config files and folder structure
- `init-craft` and `init-rails` tasks generate config files, helpers, and asset folder structures for their environments.
- So much more... see the README

### Upgrading from Beta and Release Candidates
- In task-config.js, `javascripts.entries` was renamed `javascript.entry` to be consistent with Webpack.
- You are no longer requried to provide `extensions` in each task config, or really any non-default configuration. If you want to use default settings in any task configuration, simply set the value to `true`. If you pass a configuration object, those settings will be merged with the defaults.
- Check the README for other new configuration options.

# 3.x.x Gulp Starter

This was the previous iteration of this project. Gulp Starter was not an installable package, and was more of an example starter kit that you could fork, clone, and copy into your project. The last iteration of this work is archived in the gulp-starter branch of this repo.

See the blog post that started it all:
https://www.viget.com/articles/gulp-browserify-starter-faq
