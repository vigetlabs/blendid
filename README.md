**Lots of new stuff happening in the [2.0 branch](https://github.com/greypants/gulp-starter/tree/2.0)**

**Use Rails?** Check out http://viget.com/extend/gulp-rails-asset-pipeline and https://github.com/vigetlabs/gulp-rails-pipeline

gulp-starter
============

Starter Gulp + Browserify project with examples of how to accomplish some common tasks and workflows. Read the [blog post](http://viget.com/extend/gulp-browserify-starter-faq) for more context, and check out the [Wiki](https://github.com/greypants/gulp-starter/wiki) for some good background knowledge.

Includes the following tools, tasks, and workflows:

- [Browserify](http://browserify.org/) (with [browserify-shim](https://github.com/thlorenz/browserify-shim))
- [Watchify](https://github.com/substack/watchify) (caching version of browserify for super fast rebuilds)
- [SASS](http://sass-lang.com/) (super fast libsass with [source maps](https://github.com/sindresorhus/gulp-ruby-sass#sourcemap), and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer))
- [CoffeeScript](http://coffeescript.org/) (with source maps!)
- [BrowserSync](http://browsersync.io) for live reloading and a static server
- [Image optimization](https://www.npmjs.com/package/gulp-imagemin)
- Error handling in the console [and in Notification Center](https://github.com/mikaelbr/gulp-notify)
- Shimming non common-js vendor code with other dependencies (like a jQuery plugin)
- **New** Multiple bundles with shared dependencies
- **New** Separate compression task for production builds
- **New** Icon Font generation

If you've never used Node or npm before, you'll need to install Node.
If you use homebrew, do:

```
brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/).

### Install npm dependencies
```
npm install
```

This runs through all dependencies listed in `package.json` and downloads them to a `node_modules` folder in your project directory.

### Run gulp and be amazed.
The first time you run the app, you'll also need to generate the iconFont, since this is not something we want to run every time with our `default` task.
```
npm run iconFont
```

After that, just run the `default` gulp task with:
```
npm run watch
```

This will run the `default` gulp task defined in `gulp/tasks/default.js`, which has the following task dependencies: `['sass', 'images', 'markup', 'watch']`
- The `sass` task compiles your css files.
- `images` moves images copies images from a source folder, performs optimizations, the outputs them into the build folder
- `markup` doesn't do anything but copy an html file over from src to build, but here is where you could do additional templating work.
- `watch` has `watchify` as a dependency, which will run the browserifyTask with a `devMode` flag that enables sourcemaps and watchify, a browserify add-on that enables caching for super fast recompiling. The task itself starts watching source files and will re-run the appropriate tasks when those files change.

### Configuration
All paths and plugin settings have been abstracted into a centralized config object in `gulp/config.js`. Adapt the paths and settings to the structure and needs of your project.

### Additional Features and Tasks

#### Icon Fonts

```
npm run iconFont
```

Generating and re-generating icon fonts is an every once and a while task, so it's not included in `tasks/default.js`. Run the task separately any time you add an svg to your icons folder. This task has a couple of parts.

##### The task
The task calls `gulp-iconfont` and passes the options we've configured in [`gulp/config.js`](https://github.com/greypants/gulp-starter/blob/icon-font/gulp/config.js#L27). Then it listens for a `codepoints` that triggers the generation of the sass file you'll be importing into your stylesheets. [`gulp/iconFont/generateIconSass`](./gulp/tasks/iconFont/generateIconSass.js) passes the icon data to [a template](./gulp/tasks/iconFont/template.sass.swig), then outputs the resulting file to your sass directory. See the [gulp-iconFont docs](https://github.com/nfroidure/gulp-iconfont) for more config details. You may reconfigure the template to output whatever you'd like. The way it's currently set up will make icons usable as both class names and mixins.

```sass
.twitter-button
  +icon--twitter // (@include in .scss syntax)
```

or

```html
<span class="icon -twitter"></span>
```

#### Production files

There is also a `production` task you can run:
```
npm run production
```
This will run JavaScript tests, then re-build optimized, compressed css and js files to the build folder, as well as output their file sizes to the console. It's a shortcut for running the following tasks: `karma`, `images`, `iconFont` `minifyCss`, `uglifyJs`.

#### JavaScript Tests with Karma
This repo includes a basic js testing setup with the following: [Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/). There is `karma` gulp task, which the `production` task uses to run the tests before compiling. If any tests fail, the `production` task will abort.

To run the tests and start monitoring files:
```
npm run karma start
```

--

Social icons courtesy of [icomoon.io](https://icomoon.io/#icons-icomoon)</small>

Made with ♥ at [Viget](http://viget.com)!
