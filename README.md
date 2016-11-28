# ![Blendid](extras/demo/src/images/blendid-logo.png)

[![Build Status](https://travis-ci.org/vigetlabs/gulp-starter.svg?branch=static-server)](https://travis-ci.org/vigetlabs/gulp-starter)

**Blendid** *(formerly known as Gulp Starter)* is a delicious stand-alone blend of tasks and build tools poured into [Gulp](http://gulpjs.com/) to form a full-featured modern asset pipeline. It can be used as-is as a static site builder, or can be configured and integrated into your own development environment and site or app structure. The [extras](./extras) folder contains configuration details for Rails and Craft, with more to follow. [Check out the compiled demo](http://vigetlabs.github.io/gulp-starter/) and play with [the source files](extras/demo)!

## Quick start on a fresh project (empty directory)
```bash
yarn init
yarn add blendid
yarn run blendid -- init
yarn run blendid
```

This will create default src and config files in your directory and start compiling and live-updating files! Try editing them and watch your browser auto-update!

## Recommended Setup
While you can install Node a variety of ways, and use NPM directly to install dependencies, we highly recommend using [NVM](https://github.com/creationix/nvm) to install and manage Node versions, and [Yarn (via npm)](https://yarnpkg.com/en/docs/install#alternatives-tab) to install and manage your JS dependencies, and [run npm scripts and node_modles/.bin executables](https://yarnpkg.com/en/docs/cli/run).

**Blendid requires at least Node 6+**

## Commands
All commands should be run through `yarn run`. If you haven't switched to [yarn](https://yarnpkg.com/) yet, now's a great time!

```zsh
yarn run blendid
```

This is where the magic happens. The perfect front-end workflow. This runs the development task, which starts compiling, watching, and live updating all our files as we change them. BrowserSync will start a server on port 3000, or do whatever you've configured it to do. You'll be able to see live changes in all connected browsers. Don't forget about the additional BrowserSync tools available on port 3001!

```zsh
yarn run blendid -- build
```
Compiles files for production to your destination directory. JS files are built with Webpack with standard production optimizations (uglfiy, etc.). CSS is run through CSSNano. If `rev` is set to `true` in your `task-config.js` file, filenames will be hashed (file.css -> file-a8908d9io20.css) so your server may cache them indefinitely. A `rev-manifest.json` file is output to the root of your `dest` directory (`public` by default), and maps original filenames to hashed ones. Helpers exist for Rails and Craft that read this file and automatically update replace filenames in your apps. CSS and HTML files read this file and string-replace filenames automatically. 

```zsh
yarn run blendid -- deploy
```
If you are building a static site, and would like to preview it on GitHub pages, this handy script does just that using [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages). Be sure to add or update the `homepage` property in your package.json to point to your gh-pages url.

```zsh
yarn run blendid-karma
```
Runs a pre-configured karma + mocha + chai test suite that will run any files ending in `.test.js` in your `src` directory. By default, this runs in watch mode. 

To just run once, run:

```zsh
yarn run blendid-karma -- --single-run
```

## Configuration
You may override the default configuration by creating a `config` folder with the following two files in it: `path-config.json` and `task-config.js`. These files will be created by any of the `-- init` tasks, or you can generate *only* the config files with the following command:

```
yarn run blendid -- init-config
```

### path-config.json
This file specifies the `src` and `dest` root directories, and `src` and `dest` for each task, relative to the configured root. For example, if your source files live in a folder called `app`, and your compiled files should be output to a folder called `static`, you'd update the `src` and `dest` properties here to reflect that.

### task-config.js
This file exposes per-task configuration and overrides. Better documentation is forth coming, but for now, the best way to see what you can change is to take a peak at the source tasks themselves: [gulpfile.js](gulpfile.js). The webpack config exposes a ton: [gulpfile.js/lib/webpack-multi-config.js](gulpfile.js/lib/webpack-multi-config.js)

Tasks will only run if a configuration exists for them in this file. For example, if your project has it's own handling HTML and templating (Rails, Craft, Django, etc), you may remove the `html` config completely or set it to `false`.

# FAQ

## Can I customize and add Gulp tasks?
You could clone this repo, copy over the gulpfile.js folder and package.json dependencies and run `gulp` instead of installing it as a module directly, or your could fork and maintain your own custom setup.

## I don't see JS files in my dest directory during development
JS files are compiled and live-update via BrowserSync + WebpackDevMiddleware + WebpackHotMiddleware. That means, that you won't actually see `.js` files output to your destination directory during development, but they will be available to your browser running on the BrowserSync port.

## What's under the hood?
Gulp tasks! Built combining the following:

Feature | Packages Used
------ | -----
**CSS** | [Sass](http://sass-lang.com/) ([Libsass](http://sass-lang.com/libsass) via [node-sass](https://github.com/sass/node-sass)), [Autoprefixer](https://github.com/postcss/autoprefixer), [CSSNano](https://github.com/ben-eb/cssnano), Source Maps
**JavaScript** | [Babel](http://babeljs.io/), [Webpack](http://webpack.github.io/)
**HTML** | [Nunjucks](https://mozilla.github.io/nunjucks/), [gulp-data](https://github.com/colynb/gulp-data), or bring your own
**Images** | ~~Compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin)~~ See [README](src/images/README.md)
**Icons** | Auto-generated [SVG Sprites](https://github.com/w0rm/gulp-svgstore)
**Fonts** | Folder and `.sass` mixin for including WebFonts
**Live Updating** | [BrowserSync](http://www.browsersync.io/), [Webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware), [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
**Production Builds** | CSS is [minified](http://cssnano.co/), JS is compressed and optimized with various Webpack plugins, [filename md5 hashing (reving)](https://github.com/sindresorhus/gulp-rev), [file size reporting](https://github.com/jaysalvat/gulp-sizereport), local production [Express](http://expressjs.com/) server for testing builds.
**JS Testing** | [Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/), Example [Travis CI](https://travis-ci.org/) integration
**Deployment** | Quickly deploy `public` folder to gh-pages with [`gulp-gh-pages`](https://github.com/shinnn/gulp-gh-pages)


***

<a href="http://code.viget.com">
  <img src="http://code.viget.com/github-banner.png" alt="Code At Viget">
</a>

Visit [code.viget.com](http://code.viget.com) to see more projects from [Viget.](https://viget.com)
