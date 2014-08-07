gulp-starter
============

Starter Gulp + Browserify project with examples of how to accomplish some common tasks and workflows. Read the [blog post](http://viget.com/extend/gulp-browserify-starter-faq) for more context, and check out the [Wiki](https://github.com/greypants/gulp-starter/wiki) for some good background knowledge.

Includes the following tools, tasks, and workflows:

- Browserify (with browserify-shim)
- Watchify (caching version of browserify for super fast rebuilds)
- SASS (with compass and source maps!)
- CoffeeScript (with source maps!)
- jQuery (from npm)
- Backbone (from npm)
- Handlebars (as a backbone dependency)
- Non common-js vendor code (like a jQuery plugin)
- BrowserSync
- Static Server
- Image optimization
- Error Notifications in Notification Center

If you've never used Node or npm before, you'll need to install Node.
If you use homebrew, do:
```
brew install node
```

Otherwise, you can download and install from [here](http://nodejs.org/download/).

### Install Gulp Globally
Gulp must be installed globally in order to use the command line tools. *You may need to use `sudo`*
```
npm install -g gulp
```

Alternatively, you can run the version of gulp installed local to the project instead with

```
./node_modules/.bin/gulp
```

### Install Sass and Compass (if you haven't already)
The gulp-compass module relies on Compass already being installed on your system.

If you have bundler installed, simply run bundle to install dependencies from the `Gemfile`

```
bundle
``

Otherwise,
```
gem install sass
gem install compass --pre
```

### Install npm dependencies
```
npm install
```
This runs through all dependencies listed in `package.json` and downloads them
to a `node_modules` folder in your project directory.

### Run gulp and be amazed.
```
gulp
```

This will create and run the task defined in `gulpfile.js`. If you're on OS X,
and have Chrome installed, a window will open displaying the demo page. If not,
you can visit http://localhost:8080 to view the test page.
