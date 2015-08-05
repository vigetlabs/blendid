gulp-starter
============
## Features
- Compile SASS (libsass)
  - Autoprefix
  - Minify
- Compile JS with [Webpack](http://webpack.github.io/)
  - Async requires
  - Multiple bundles
  - Shared modules
  - Source Maps
  - Babel for ES6 and JSX
  - Uglify and optimizes for production builds (not in dev)
- Compile static html with [Nunjucks](https://mozilla.github.io/nunjucks/)
- Compile an SVG Spritesheet from a folder of SVGs
- Compile an Icon Font (woff, woff2, ttf, svg, eot) from a folder of SVGs
- File Watching + Live reloading with [BrowserSync](http://www.browsersync.io/)
- Optimizes Images
- Production task revs and compress all assets, and updates references
- Quickly deploy `public` folder to gh-pages (`gulp deploy` task)
- Handles WebFonts
- Testing with Karma, Mocha, Chai, Sinon
- Travis CI integration
- Local production sever for testing

## Revisions from 1.0
- Full asset pipeline and static html compilation
- New directory structure
- Replaced Browserify with [Webpack](http://webpack.github.io/docs/webpack-for-browserify-users.html)!
  - Async CommonJS module requires
  - Automatically splits out shared dependencies
- New `html` task w/ Nunjucks templating/compiling
- Replace CoffeeScript with ES6 ([Babel.js](http://babeljs.io/))
- New `server` task to test production files locally
- New `deploy` task to deploy the public directory to gh-pages
- New `rev` task that revisions filenames and compress css and js
- Use `gulp-watch` instead of `gulp.watch` (correctly handles new files)
- New `build:production` task runs tests, compression + filename revisioning
- Remove old examples and extraneous dependencies
- Upgrades dependencies
- Added example Travis CI integration that runs karma tests and production build
- Add SVG sprite implementation from @synapticism in #100

## Live Demo
http://greypants.github.io/gulp-starter/
Result of running `gulp deploy`

## Install dependencies
```
npm install
```

## Start gulp for local development
```
npm run watch
```
or 

```
gulp
```
To use gulp commands directly, you may need to alias `gulp` to `node_modules/.bin/gulp`, or `npm install -g gulp`.

Start editing assets and views from the `gulp/assets` and `gulp/views` folder. Files compile to `public`.

## Preview production environment
```
npm start
```

or 

```
gulp build:production
gulp server
```

## Deploy to GitHub pages
```
npm run deploy
```
This will run karma, build your files, revision and compress them, and copy the contents of the public folder to a `gh-pages` branch, and push it up to GitHub.

[![Build Status](https://travis-ci.org/greypants/gulp-starter.svg?branch=static-server)](https://travis-ci.org/greypants/gulp-starter)
