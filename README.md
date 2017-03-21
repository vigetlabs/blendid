# ![Blendid](https://raw.githubusercontent.com/vigetlabs/gulp-starter/blendid/extras/demo/src/images/blendid-logo.png)

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


**Using Rails?**
Replace line 3 above with:

```bash
yarn run blendid -- init-rails
```

To generate a pre-configured blendid Rails setup with initalizers, asset, and deploy helpers!

More platform-specific initializers coming soon.

## Recommended Setup
While you can install Node a variety of ways, and use NPM directly to install dependencies, we highly recommend using [NVM](https://github.com/creationix/nvm) to install and manage Node versions, and [Yarn (via npm)](https://yarnpkg.com/en/docs/install#alternatives-tab) to install and manage your JS dependencies, and [run npm scripts and node_modles/.bin executables](https://yarnpkg.com/en/docs/cli/run).

**Blendid requires at least Node 6+**

# Commands
All commands should be run through `yarn run`. If you haven't switched to [yarn](https://yarnpkg.com/) yet, now's a great time!

```zsh
yarn run blendid
```

This is where the magic happens. The perfect front-end workflow. This runs the development task, which starts compiling, watching, and live updating all our files as we change them. BrowserSync will start a server on port 3000, or do whatever you've configured it to do. You'll be able to see live changes in all connected browsers. Don't forget about the additional BrowserSync tools available on port 3001!

```zsh
yarn run blendid -- build
```
Compiles files for production to your destination directory. JS files are built with Webpack with standard production optimizations (uglfiy, etc.). CSS is run through CSSNano. If `rev` is set to `true` in your `task-config.js` file, filenames will be hashed (file.css -> file-a8908d9io20.css) so your server may cache them indefinitely. A `rev-manifest.json` file is output to the root of your `dest` directory (`public` by default), and maps original filenames to hashed ones. Helpers exist for Rails and Craft that read this file and automatically update filenames in your apps. CSS and HTML files read this file and string-replace filenames automatically.

```zsh
yarn run blendid -- deploy
```
If you are building a static site, and would like to preview it on GitHub pages, this handy script does just that using [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages). Be sure to add or update the `homepage` property in your `package.json` to point to your gh-pages url.

```zsh
yarn run blendid-karma
```
Runs a pre-configured karma + mocha + chai test suite that will run any files ending in `.test.js` in your `src` directory. By default, this runs in watch mode.

To just run once, run:

```zsh
yarn run blendid-karma -- --single-run
```

# Configuration
You may override the default configuration by creating a `config` folder with the following two files in it: `path-config.json` and `task-config.js`. These files will be created by any of the `-- init` tasks, or you can generate *only* the config files with the following command:

```
yarn run blendid -- init-config
```

## path-config.json
This file specifies the `src` and `dest` root directories, and `src` and `dest` for each task, relative to the configured root. For example, if your source files live in a folder called `app`, and your compiled files should be output to a folder called `static`, you'd update the `src` and `dest` properties here to reflect that.

## task-config.js
This file exposes per-task configuration and overrides. Better documentation is forth coming, but for now, the best way to see what you can change is to take a peek at the source tasks themselves: [gulpfile.js](gulpfile.js). The webpack config exposes a ton: [gulpfile.js/lib/webpack-multi-config.js](gulpfile.js/lib/webpack-multi-config.js)

Tasks will only run if a configuration exists for them in this file. For example, if your project has its own handling HTML and templating (Rails, Craft, Django, etc), you may remove the `html` config completely or set it to `false`.

- Any task may be disabled by removing it from the config or setting the value to `false`.
- All asset tasks have an `extensions` option that can be used to limit the types of files processed and watched.

### browserSync
Options to pass to [browserSync](https://browsersync.io/docs/options).

**If you're using Nunjucks (built in) to compile a static site**, you'll want to use the `server` and tell it which server to serve up via the `baseDir` option.
```js
browserSync: {
  server: {
    baseDir: "public"
  }
}
```

**If you're running your own server**, you'll want to use the `proxy` option, along with `files` to tell browserSync to watch additional files (like your templates).
```js
browserSync: {
  proxy: {
    target: "localhost:8000"
  }
}
```

### javascripts

#### `entries`
Discrete js bundle entry points. A js file will be bundled for each item. Paths are relative to the `javascripts` folder. This maps directly to `webpackConfig.entry`.

#### `babel`
Object to overwrite the default Babel loader config object. This defaults to `{ presets: ['es2015', 'stage-1'] }`

#### `babelLoader`
Object to extend the default config for entire Babel loader object. See [Webpack loader documentation](https://webpack.github.io/docs/loaders.html#loaders-by-config) for details.

#### `provide`
Key value list of variables that should be provided for modules to resolve dependencies on import using [ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin)

#### `plugins`
Define additional webpack plugins that should be used in all environments

#### `loaders`
Define additional webpack loaders that should be used in all environments

#### `development`, `test`, `production`
Define additional webpack plugins and loaders for development, test or production environment
```js
development: {
  plugins: (webpack) => { return [ new webpack.IgnorePlugin(/jsdom$/) ] },
  loaders: []
}
```
#### `hot`
By default, webpack HMR will simply will do a full browser refresh when your js files change. If your code takes advantage of [hot module replacement methods](https://webpack.github.io/docs/hot-module-replacement.html), modules will be hot loaded.

If you're using React, `yarn add react-hot-loader@next` and set `react: true` to enable [react-hot-loader](https://github.com/gaearon/react-hot-loader).

*Defaults to :*
```js
hot: {
  enabled: true,
  reload: true,
  react: false
}
```

### stylesheets

#### `autoprefixer`
Your Sass gets run through [Autoprefixer](https://github.com/postcss/autoprefixer), so don't prefix! Use this option to pass configuration. Defaults to `{ browsers: ["last 3 versions"]`.

#### `sass`
Options to pass to [node-sass](https://github.com/sass/node-sass#options).

Defaults to `{ includePaths: ["./node_modules"]}` so you can `@import` files installed to `node_modules`.


### html
**Note:** If you are on a platform that's already handing compiling html (Wordpress, Craft, Rails, etc.), set `html: false` or delete the configuration object completely from `task-config.js`. If that's the case, don't forget to use the BrowserSync [`files` option](https://browsersync.io/docs/options#option-files) in the `browserSync` config object to start watching your templates folder.

Robust templating with [Nunjucks](https://mozilla.github.io/nunjucks/). Nunjucks is nearly identical in syntax to Twig (PHP), and replaces Swig (a Twig-like js templating language), which is no longer maintained.

#### `manageEnv`
Blendid supports adding custom Nunjucks filters via `task-config.js` by passing `html.manageEnv`. For example:
```js
html: {
  manageEnv: function(env) {
    env.addFilter('excited', function(input) {
      return (input + '!')
    })
  }
}
```

#### `dataFile`
A path to a JSON file containing data to use in your Nunjucks templates via [`gulp-data`](https://github.com/colynb/gulp-data).

#### `htmlmin`
[Options](https://github.com/kangax/html-minifier#options-quick-reference) to pass to [`gulp-htmlmin`](https://github.com/jonschlinkert/gulp-htmlmin.

#### `excludeFolders`
You'll want to exclude some folders from being compiled directly. This defaults to: `["layouts", "shared", "macros", "data"]`

### static
There are some files that belong in your root destination directory that you won't want to process or revision in production. Things like [favicons, app icons, etc.](http://realfavicongenerator.net/), should go in `src/static`, and will get copied over to `public` as a last step (after revisioning in production). *Nothing* should ever go directly in `public`, since it gets completely trashed and re-built when running the `default` or `production` tasks.

#### `srcOptions`
Options passed to `gulp.src`. See [gulp documetation](https://github.com/gulpjs/gulp/blob/master/docs/API.md#options) for details. Defaults to:

```js
static: {
  srcOptions: {
    dot: true // include dotfiles
  }
}
```

### fonts, images
These tasks simply copy files from `src` to `dest` configured in `path-config.json`. Nothing to configure here other than specifying extensions or disabling the task.

### svgSprite
```js
svgSprite: true
```
Generates an SVG Sprite from svg files in `src/icons`! You can either include the created SVG directly on the page and reference the icon by id like this:

```html
  <svg viewBox="0 0 1 1"><use xlink:href='#my-icon'></use></svg>
```

or reference the image remotely.

```html
<svg viewBox="0 0 1 1"><use xlink:href='images/spritesheets/sprites.svg#my-icon'></use></svg>
```
If you reference the sprite remotely, be sure to include something like [svg4everybody](https://github.com/jonathantneal/svg4everybody) to ensure external loading works on Internet Explorer.

I've included a helper to generate the required svg markup in `src/html/macros/helpers.html`, so you can just do:
```html
  {{ sprite('my-icon') }}
```
Which spits out:

```html
  <span class='sprite -my-icon'>
    <svg viewBox="0 0 1 1"><use xlink:href='images/spritesheets/sprites.svg#my-icon'></use></svg>
  </span>
```

This particular setup allows styling 2 different colors from your CSS. You can have unlimited colors hard coded into your svg.

In the following example, the first path will be `red`, the second will be `white`, and the third will be `blue`. Paths **without a fill attribute** will inherit the `fill` property from CSS. Paths with `fill="currentColor"` will inherit the current CSS `color` value, and hard-coded fills will not be overwritten, since inline styles trump CSS values.

```sass
.sprite
  fill: red
  color: white
```

```svg
  <svg xmlns="http://www.w3.org/2000/svg">
    <path d="..."/>
    <path fill="currentColor" d="..."/>
    <path fill="blue" d="..."/>
  </svg>
```

I recommend setting up your SVGs on a 500 x 500 canvas, centering your artwork, and expanding/combining any shapes of the same color. This last step is important. [Read more on SVG optimization here!](https://www.viget.com/articles/5-tips-for-saving-svg-for-the-web-with-illustrator)

# FAQ

## Can I customize and add Gulp tasks?
See #352. In the meantime, you could clone this repo, copy over the gulpfile.js folder and package.json dependencies and run `gulp` instead of installing it as a module directly, or your could fork and maintain your own custom setup.

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
