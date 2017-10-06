# ![Blendid](https://raw.githubusercontent.com/vigetlabs/blendid/master/extras/blendid-logo.png)

[![Build Status](https://travis-ci.org/vigetlabs/blendid.svg?branch=static-server)](https://travis-ci.org/vigetlabs/blendid)
[![Stories in Ready](https://badge.waffle.io/vigetlabs/blendid.png?label=ready&title=Ready)](https://waffle.io/vigetlabs/blendid)

**Blendid** *(formerly known as Gulp Starter)* is a delicious stand-alone blend of tasks and build tools poured into [Gulp](http://gulpjs.com/) to form a full-featured modern asset pipeline. It can be used as-is as a static site builder, or can be configured and integrated into your own development environment and site or app structure.

## Quick start on a fresh project (empty directory)
```bash
yarn init
yarn add blendid
yarn run blendid -- init
yarn run blendid
```

This will create default src and config files in your directory and start compiling and live-updating files! Try editing them and watch your browser auto-update!

### HTTP/2 upgrade
If you would like to take advantage of [HTTP/2 multiplexing](https://stackoverflow.com/a/36519379/2031343) for your stylesheets and scripts, this is the task for you! This task sets up limited global CSS file that goes on every page with universal styles, such as header, footer, buttons, typography, etc, while parsing out individual components that have access to the overall project configuration styles (variables, functions, mixins, etc) to be loaded only with their respective HTML template.

Javascript will function similarly, only importing the necessary scripts on a per-module basis.

#### To Use HTTP/2 Upgrade
After running line 3 ( `yarn run blendid -- init` ) run:

```bash
yarn run blendid -- http2-upgrade
```

Note that you must have your server set to HTTP/2 otherwise you will be sending unnecessary requests to your HTTP/1.1 server, slowing it down.

Also note that this upgrade only works with the standard default init task. It may work with the Drupal and Craft init tasks, but will definitely break if used with the Rails init task. *If not paired with the default init task, use at your own risk!*

For more information:
- [HTTP/2 README](https://github.com/vigetlabs/blendid/blob/master/extras/http2/src/stylesheets/components/README.md)
- [the benefits of HTTP/2](https://www.viget.com/articles/getting-started-with-http-2-part-1)
- [managing and delivering assets using HTTP/2](https://www.viget.com/articles/managing-css-js-http-2)

### Using Craft?
Replace line 3 above with:

```bash
yarn run blendid -- init-craft
```

### Using Drupal 8?
Replace line 3 above with:

```bash
yarn run blendid -- init-drupal
```

### Using Rails?
Replace line 3 above with:

```bash
yarn run blendid -- init-rails
```

These initializers will generate pre-configured blendid config files, helpers, and asset folder structure for the referenced platform. Pull requests welcome to add more!

### Adding to an existing project?

You can generate *just the base config files* with:

```
yarn run blendid -- init-config
```

Then edit the configs to match the needs of your project.

## Recommended Setup

#### [Node Version Manager](https://github.com/creationix/nvm)
**Blendid requires at least Node 6**. While you can install Node a variety of ways, we highly recommend using [nvm](https://github.com/creationix/nvm) to install and manage Node versions.

#### [Yarn](https://yarnpkg.com/en/docs/install)
We recommend `yarn` over `npm` for a few reasons: `yarn.lock` files are a lifesaver, modules install way faster, and [`yarn run`](https://yarnpkg.com/en/docs/cli/run) for running `package.json` `scripts` and `node_modules/.bin` executables is a nice convenience. It's just better.

# Commands
All commands should be run through `yarn run`. If you haven't switched to [yarn](https://yarnpkg.com/) yet, now's a great time!

```zsh
yarn run blendid
```

This is where the magic happens. The perfect front-end workflow. This runs the development task, which starts compiling, watching, and live updating all our files as we change them. Browsersync will start a server on port 3000, or do whatever you've configured it to do. You'll be able to see live changes in all connected browsers. Don't forget about the additional Browsersync UI tools available on port 3001!

```zsh
yarn run blendid -- build
```
Compiles files for production to your destination directory. JS files are built with webpack 3 with standard production optimizations (uglfiy, etc.). CSS is run through CSSNano. If `rev` is set to `true` in your `task-config.js` file, filenames will be hashed (file.css -> file-a8908d9io20.css) so your server may cache them indefinitely. A `rev-manifest.json` file is output to the root of your `dest` directory (`public` by default), and maps original filenames to hashed ones. Helpers exist for Rails and Craft that read this file and automatically update filenames in your apps. CSS and HTML files read this file and string-replace filenames automatically.

```zsh
yarn run blendid -- ghPages
```
If you are building a static site, and would like to preview it on GitHub pages, this handy script does just that using [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages). Be sure to add or update the `homepage` property in your `package.json` to point to your gh-pages url.

It's a good idea to add aliases for these commands to your `package.json` `scripts` object.

```
// package.json
  "scripts": {
    "start": "yarn run blendid",
    "build": "yarn run blendid -- build"
  }

// Command line
yarn start
yarn run build
```

# Configuration
You may override the default configuration by creating a `config` folder with the following two files in it: `path-config.json` and `task-config.js`. These files will be created by any of the `-- init` tasks, or you can generate *only* the config files with the following command:

```
yarn run blendid -- init-config
```

By default, Blendid expects these files to live in a `./config` a the root of your project. You may specify an alternative relative location by setting an environment variable:

```
// package.json
"scripts": {
  "blendid": "BLENDID_CONFIG_PATH='./some/location' blendid"
}

// command line
yarn run blendid
```

The files must be named `path-config.json` and `task-config.js`.

### Configuring file structure

`path-config.json`

File structure is configured through a **config/path-config.json** file. This file is JSON so that other platforms like Ruby or PHP can easily read it in and use it to build asset path helpers for replacing hashed filenames in production.

This file specifies the `src` and `dest` root directories, and `src` and `dest` for each task, relative to the configured root.

A minimal setup might look something like this:

```json
{
  "src": "./src",
  "dest": "./public",

  "javascripts": {
    "src": "javascripts",
    "dest": "javascripts"
  },

  "stylesheets": {
    "src": "stylesheets",
    "dest": "stylesheets"
  },

  "images": {
    "src": "images",
    "dest": "images"
  }
}
```

That's saying that your source files live at `./src`, and the root of where you want your files to be output is at `./public`. So for example, `./src/stylesheets/app.scss` would get compiled to `./public/stylesheets/app.css`.

### Configuring tasks

`task-config.js`

Specific task configuration is done through a **config/task-config.js** file. Depending on your project and platform, you may want to disable some tasks, or customize others. This file exposes per-task configuration and overrides. At minimum, you just need to set the task to `true` to enable the task with its default configuration. If you wish to configure a task, provide a configuration object instead.

A minimal setup might look something like this:

```js
module.exports = {
  html        : false,
  fonts       : false,
  static      : false,
  svgSprite   : false,
  ghPages     : false,

  images      : true,
  stylesheets : true,

  javascripts: {
    entry: {
      // files paths are relative to
      // javascripts.dest in path-config.json
      app: ["./app.js"]
    }
  },

  browserSync: {
    server: {
      // should match `dest` in
      // path-config.json
      baseDir: 'public'
    }
  }
}
```

- Any task may be disabled by setting the value to `false`. For example, if your project has its own handling HTML and templating (Rails, Craft, Django, etc), you'll want to set `html` to `false` in your task-config.
- All asset tasks have an `extensions` option that can be used to overwrite the that are processed and watched.
- The `html` and `stylesheets` tasks may be replaced via their `alternateTask` options

See [task config defaults](gulpfile.js/lib/task-defaults.js) for a closer look. All configuration objects will be merged with these defaults. Note that `array` options are replaced rather than merged or concatenated.

### browserSync (required)
Options to pass to [Browsersync](https://browsersync.io/docs/options).

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
    target: "my-rails-project.dev:3000"
  },
  files: ["app/views"]
}
```

**If you need to turn on polling within webpack-dev-middleware**, specify `watchOptions` within this section, too.
```js
browserSync: {
  watchOptions: {
    poll: true,
    aggregateTimeout: 300
  }
}
```

### javascripts
Under the hood, JS is compiled with webpack 3 with a heavily customized webpack file to get you up and running with little to no configuration. An API for configuring some of the most commonly accessed options are exposed, along with some other helpers for scoping to environment. Additionally, you can get full access to modify Blendid's `webpackConfig` via the [`customizeWebpackConfig`](#customizewebpackconfig) option.

#### `entry` (required)
Discrete js bundle entry points. A js file will be bundled for each item. Paths are relative to the `javascripts` folder. This maps directly to `webpackConfig.entry`.

#### `publicPath`
The public path to your assets on your server. Only needed if this differs from the result of `path.join(PATH_CONFIG.dest, PATH_CONFIG.javascripts.dest)`. Maps directly to `webpackConfig.publicPath`

#### `devtool`
Sets the webpack devtool option in development mode. Defaults to `eval-cheap-module-source-map`, one of the fastest source map options. To enable sourcemaps in production builds, use `customizeWebpackConfig`](#customizeWebpackConfig).

#### `babel`
Object to overwrite the default Babel loader config object. This defaults to `{ presets:  [["es2015", { "modules": false }], 'stage-1'] }`. Same format as a `.babelrc` file. See [#380](https://github.com/vigetlabs/gulp-starter/issues/380).

#### `babelLoader`
Object to extend the default config for _entire_ Babel loader object. See [webpack loader documentation](https://webpack.js.org/concepts/loaders/) for details.

#### `provide`
Key value list of variables that should be provided for modules to resolve dependencies on import using [webpack.ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin). A common example is making jQuery available to all modules (jQuery plugins need this). In that scenario, with `jquery` installed via `yarn`, add this to your javascripts config:

```js
provide: {
  $: "jquery",
  jQuery: "jquery"
}
```

Under the hood, this gets passed directly to [webpack.ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin) in the webpack config.

```js
plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
]
```

#### `plugins`
Define additional webpack plugins that should be used in all environments

#### `loaders`
Define additional webpack loaders that should be used in all environments. Adds to `webpackConfig.module.rules`

#### `development`, `production`
Specify additional environment specific configuration to be merged in with Blendid's defaults

- [`devtool`](https://webpack.js.org/configuration/devtool/#devtool)
- [`plugins`](https://webpack.js.org/concepts/plugins/)
- [`loaders`](https://webpack.js.org/concepts/loaders/)

_Production Only:_

- [`uglifyJsPlugin`](https://webpack.js.org/plugins/uglifyjs-webpack-plugin/#options)
- [`definePlugin`](https://webpack.js.org/plugins/define-plugin)

Note that if `devtool` is set in production, Blendid will automatically[set to `uglifyJsPlugin.sourceMap` to `true`](https://github.com/webpack/webpack/issues/2704#issuecomment-228860162).

**Example:**

```js
production: {
  devtool: 'hidden-source-map',
  uglifyJsPlugin: {
    extractComments: true
  },
  definePlugin: {
    SOME_API_KEY: 'abcdefg'
  },
  plugins: (webpack) => { return [ new webpack.IgnorePlugin(/jsdom$/) ] },
  loaders: [] // Adds to `webpackConfig.module.rules`
}
```

By default, the `env` will be `"development"` when running `yarn run blendid`, and `"production"` when running `yarn run blendid -- build`.

#### `hot`
By default, webpack HMR will simply will do a full browser refresh when your js files change. If your code takes advantage of [hot module replacement methods](https://webpack.github.io/docs/hot-module-replacement.html), modules will be hot loaded.

*Defaults to:*

```js
hot: {
  enabled: true,
  reload: true,
  quiet: true,
  react: false
}
```

**If you're using React** `yarn add react-hot-loader@next` and set `react: true` to enable [react-hot-loader 3](https://github.com/gaearon/react-hot-loader/tree/next). [Follow the docs](https://github.com/gaearon/react-hot-loader/tree/next/docs#webpack-2) and update your React app to take advantage.


#### `customizeWebpackConfig`
In the event that an option you need is not exposed, you may access, modify and return a further customized webpackConfig by providing this option as a function. The function will receive the Blendid `webpackConfig`, `env` and `webpack` as params. The `env` value will be either `development` (`yarn run blendid`) or `production` (`yarn run blendid -- build`).

```js
customizeWebpackConfig: function (webpackConfig, env, webpack) {
  if(env === 'production') {
    webpackConfig.devtool = "nosources-source-map"
  }

  return webpackConfig
}
```

**CAUTION!** Avoid overwriting `webpackConfig.entry` or `webpackConfig.plugins` via this function, and rely on the `entry` and `plugins` options above to avoid breaking Blendid's hot-loading and file revisioning setup ([view source](https://github.com/vigetlabs/gulp-starter/blob/master/gulpfile.js/lib/webpack-multi-config.js)).

### stylesheets

You're welcome to use straight CSS, but Blendid will also compile [Sass](http://sass-lang.com/) (`.scss` and `.sass`) for you automatically.

#### `autoprefixer`
Your Sass gets run through [Autoprefixer](https://github.com/postcss/autoprefixer), so don't prefix! Use this option to pass configuration. Defaults to `{ browsers: ["last 3 versions"]`.

#### `sass`
Options to pass to [node-sass](https://github.com/sass/node-sass#options).

Defaults to `{ includePaths: ["./node_modules"]}` so you can `@import` files installed to `node_modules`.

#### `alternateTask`
If you're not a Sass fan, or for whatever reason, want to use your own task for compiling your stylesheets, you may use the `alternateTask` option to return an alternate function to run as the `stylesheets` task.

```js
stylesheets: {
  alternateTask: function(gulp, PATH_CONFIG, TASK_CONFIG) {
    // PostCSS task instead of Sass
    return function() {
      const plugins = [
          autoprefixer({browsers: ['last 1 version']}),
          cssnano()
      ]
      return gulp.src('./src/*.css')
          .pipe(postcss(plugins))
          .pipe(gulp.dest('./dest'))
    }
  }
}
```

### html
**Note:** If you are on a platform that's already handing compiling html (Wordpress, Craft, Rails, etc.), set `html: false` or delete the configuration object completely from `task-config.js`. If that's the case, don't forget to use the Browsersync [`files` option](https://browsersync.io/docs/options#option-files) in the `browserSync` config object to start watching your templates folder.

Blendid can work with straight HTML, but it will also compile [Nunjucks](https://mozilla.github.io/nunjucks/), a Jinja/Django-like templating language similar to Twig (used by Craft and Synfony), Liquid (used by Shopify), and the no longer maintained Swig.

#### `nunjucksRender`
Pass options directly to [`gulp-nunjucks-render`](https://github.com/carlosl/gulp-nunjucks-render#options). For example, you can add custom Nunjucks filters via the `manageEnv` option.

```js
html: {
  nunjucksRender: {
    manageEnv: function(env) {
      env.addFilter('excited', function(input) {
        return (input + '!')
      })
    }
  }
}
```

#### `dataFunction`
[gulp-data](https://github.com/colynb/gulp-data) `dataFunction` used provide data to templates. Defaults to reading a in a global JSON, specified by the `dataFile` option.

#### `dataFile`
A path to a JSON file containing data to use in your Nunjucks templates via [`gulp-data`](https://github.com/colynb/gulp-data).

#### `htmlmin`
[Options](https://github.com/kangax/html-minifier#options-quick-reference) to pass to [`gulp-htmlmin`](https://github.com/jonschlinkert/gulp-htmlmin).

#### `excludeFolders`
You'll want to exclude some folders from being compiled directly. This defaults to: `["layouts", "shared", "macros", "data"]`

#### `alternateTask`
If you're not a nunjucks fan, or for whatever reason, want to use your own task for compiling your html, you may use the `alternateTask` option to return an alternate function to run as the `html` task.

```js
html: {
  alternateTask: function(gulp, PATH_CONFIG, TASK_CONFIG) {
    // Jade task instead of Nunjucks
    return function() {
      gulp
        .src('./lib/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./dist/'))    }
  }
}
```

### static
There are some files that belong in your root destination directory that you won't want to process or revision in production. Things like [favicons, app icons, etc.](http://realfavicongenerator.net/) should go in `src/static`, and will get copied over to `public` as a last step (after revisioning in production). *Nothing* should ever go directly in `public`, since it gets completely trashed and re-built when running the `default` or `production` tasks.

#### `srcOptions`
Options passed to `gulp.src`. See [gulp documentation](https://github.com/gulpjs/gulp/blob/master/docs/API.md#options) for details. Defaults to:

```js
static: {
  srcOptions: {
    dot: true // include dotfiles
  }
}
```

### fonts, images
These tasks simply copy files from `src` to `dest` configured in `path-config.json`. Nothing to configure here other than specifying extensions or disabling the task.

The image task previously ran through image-min, but due to the size of the package and the fact it doesn't need to be run every time - it was removed. The current recommendation is to install [imagemin-cli](https://github.com/imagemin/imagemin-cli) globally and running it on your source files periodically. If you prefer GUIs, you can try [ImageOptim](https://imageoptim.com/mac) instead.

### ghPages
You can deploy the contents your `dest` directly to a remote branch (`gh-pages` by default) with `yarn run blendid -- ghPages`. Options specified here will get passed directly to [gulp-gh-pages](https://github.com/shinnn/gulp-gh-pages#ghpagesoptions).

### svgSprite
Generates an SVG Sprite from svg files in `src/icons`! You can either include the created SVG directly on the page and reference the icon by id like this:

```html
  <svg viewBox="0 0 1 1"><use xlink:href='#my-icon'></use></svg>
```

or reference the image remotely.

```html
<svg viewBox="0 0 1 1"><use xlink:href='images/spritesheets/sprites.svg#my-icon'></use></svg>
```
If you reference the sprite remotely, be sure to include something like [inline-svg-sprite](https://github.com/vigetlabs/inline-svg-sprite) or [svg4everybody](https://github.com/jonathantneal/svg4everybody) to ensure external loading works on Internet Explorer.

Blendid includes a helper which generates the required svg markup in `src/html/macros/helpers.html`, so you can just do:

```twig
  {{ sprite('my-icon') }}
```

which spits out:

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

### clean

```js
clean: {
  patterns: [
    path.resolve(process.env.PWD, 'dist/assets'),
    path.resolve(process.env.PWD, 'dist/templates')
  ]
}

By default, the entire `dest` directory is deleted before each build. By setting the `clean.patterns` option, you can specify which directory or directories (using globbing syntax) should be deleted instead. Use this if you have subdirectories within the `dest` directory that should be left alone (media uploaded through a CMS, say).

### production
By default, filenames are revisioned when running the production `build` task. If you want to disable this behavior, you can set `rev` to false.

```js
production: {
  rev: false
}
```

### additionalTasks
If you wish to define additional gulp tasks, and have them run at a certain point in the build process, you may use this configuration to do so via the following config object:

```js
additionalTasks: {
  initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
    // Add gulp tasks here
  },
  development: {
    prebuild: [],
    postbuild: []
  },
  production: {
    prebuild: [],
    postbuild: []
  }
}
```

Blendid will call `initialize`, passing in `gulp`, along with the path and task configs. Use this method to define or `require` additional gulp tasks. You can specify when and in what order your custom tasks should run in the `production` and `development` `prebuild` and `postbuild` options.

For example, say you had a sprite task you wanted to run before your css compiled, and in production, you wanted to run an image compression task you had after all assets had been compiled. Your configuration might look something like this:

```
additionalTasks: {
  initialize(gulp, PATH_CONFIG, TASK_CONFIG) {
    gulp.task('createPngSprite', function() {
      // do stuff
    })
    gulp.task('compressImages', function() {
      // compress all the things
    })
  },
  development: {
    prebuild: ['createPngSprite'],
    postbuild: []
  },
  production: {
    prebuild: ['createPngSprite'],
    postbuild: ['compressImages']
  }
}
```

# FAQ

## Can I customize and add Gulp tasks?
Yep! See [additionalTasks](#additionaltasks), as well as the `task` option of the [`stylesheets`](stylesheets) and [`html`](html) configs.

## I don't see JS files in my dest directory during development
JS files are compiled and live-updated via Browsersync + webpack Dev Middleware + webpack Hot Middleware. That means you won't actually see `.js` files output to your destination directory during development, but they will be available to your browser running on the Browsersync port.

## Where'd the Karma + Mocha + Sinon + Chai JS testing setup go?
Just use [Jest](https://facebook.github.io/jest/)! It used to be super complicated to string the right series of tools together to get a cohesive and full featured JS test suite — which is why we previously did it for you. But now Jest exists, solves these issues and is our strong recommendation.

## What's under the hood?
Gulp tasks! Built combining the following:

Feature | Packages Used
------ | -----
**CSS** | [Sass](http://sass-lang.com/) ([Libsass](http://sass-lang.com/libsass) via [node-sass](https://github.com/sass/node-sass)), [Autoprefixer](https://github.com/postcss/autoprefixer), [CSSNano](https://github.com/ben-eb/cssnano), Source Maps
**JavaScript** | [Babel](http://babeljs.io/), [webpack 3](https://webpack.js.org/)
**HTML** | [Nunjucks](https://mozilla.github.io/nunjucks/), [gulp-data](https://github.com/colynb/gulp-data), or bring your own
**Images** | ~~Compression with [imagemin](https://www.npmjs.com/package/gulp-imagemin)~~
**Icons** | Auto-generated [SVG Sprites](https://github.com/w0rm/gulp-svgstore)
**Fonts** | Folder and `.sass` mixin for including WebFonts
**Live Updating** | [Browsersync](http://www.browsersync.io/), [webpack Dev Middleware](https://github.com/webpack/webpack-dev-middleware), [webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
**Production Builds** | CSS is [minified](http://cssnano.co/), JS is compressed and optimized with various webpack plugins, [filename md5 hashing (reving)](https://github.com/sindresorhus/gulp-rev), [file size reporting](https://github.com/jaysalvat/gulp-sizereport) for long-term file caching
**Deployment** | Quickly deploy `public` folder to gh-pages with [`gulp-gh-pages`](https://github.com/shinnn/gulp-gh-pages)


***

<a href="http://code.viget.com">
  <img src="http://code.viget.com/github-banner.png" alt="Code At Viget">
</a>

Visit [code.viget.com](http://code.viget.com) to see more projects from [Viget.](https://viget.com)
