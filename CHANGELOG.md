# Changelog

## 4.4.3
- updates pathing to work in both Windows and Mac environments

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
- Adds an HTTP/2 assets upgrade by running `yarn run blendid -- http2-upgrade`
- Updates extras to include HTTP/2 init files

## 4.2.0
- Update dependencies, including Webpack 3
- Adds Drupal init task
- Readme updates
- Allow manually specifying the files that the `clean` task will delete via a `clean.patterns` option


## 4.1.0
- Add `devtool`, `uglifyJsPlugin`, and `definePlugin` environment options
- [Autoset `uglifyJsPlugin.sourceMap` to `true`](https://github.com/webpack/webpack/issues/2704#issuecomment-228860162) if `production.devtool` is defined
- Add `publicPath` to Craft task-config.js [#432](https://github.com/vigetlabs/blendid/issues/432)

## 4.0.1
- add watchOptions to browserSync config [#429](https://github.com/vigetlabs/blendid/pull/429)

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
