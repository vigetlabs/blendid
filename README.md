gulp-starter
============
Gulp Starter has evolved into a full featured modern asset pipeline. It can be used as-is as a static site builder, or can be configured and integrated into your own development environment and site structure. This is not an installable module. This is meant to be a starting point — collection of tasks and configuration. Fork it or `git clone https://github.com/greypants/gulp-starter.git` and modify to fit your project.

**Demo:** http://greypants.github.io/gulp-starter/

## Features
- **CSS:** [Sass](http://sass-lang.com/) (indented, scss, or both)
  - Libsass (node-sass) for super fast compiles
  - Autoprefixer
- **JS:** Modular ES6 with [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/)
  - Async requires
  - Multiple bundles
  - Shared modules
  - Source Maps
- **HTML**: Static templating with [Nunjucks](https://mozilla.github.io/nunjucks/)
- **Images:**
  - **SVG Sprites**: Compiles a spritesheet from a folder of SVGs
  - Compression with image-min
- **Fonts:**
  - **Icon Fonts:** Generate from a folder of SVGs
  - Folder and `.sass` mixin for including WebFonts
- **Development Mode:**
  - File Watching and Live Reloading with [BrowserSync](http://www.browsersync.io/)
  - Source Maps
- **Production Builds:**
  - JS and CSS are uglified and minified
  - All filneames are revisioned with an md5 hash, a `rev-manifest.json` file is genrearted and all asset references are updated in html, css, and js
  - File size reporting
  - Local production sever for testing
- **Testing:**
  - JS test examples with Karma, Mocha, Chai, Sinon
  - Travis CI integration
- **Deployment:**
  - Quickly deploy `public` folder to gh-pages (`gulp deploy` task)

# Basic Usage
Make sure Node 12.x is installed. I recommend using [NVM](https://github.com/creationix/nvm) to manage versions.

#### Install Dependencies
```
npm install
```

#### Start compiling, serving, and watching files
```
npm run development
```
This runs `gulp` from `./node_modules/bin`, using the version installed with this project, rather than a globally installed instance. All commands in the package.json `scripts` work this way.

[BrowserSync](http://www.browsersync.io/) will serve up files to `localhost:3000` and will stream live changes to the code and assets to all connected browsers. Don't forget about the additional tools available on `localhost:3001`

# The Details
If you have a different directory structure, you can configure paths and settings in `gulpfile.js/config`. `index.js` contains the main paths, and individual config files are available to configure each task.

#### JS
```
gulpfile.js/tasks/webpack-development
```
Modular ES6 with [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/)

I've included various examples of generating mulitple files, async module loading and splitting out shared dependences to show the power of Webpack. Adjust the webpack config (`.gulpfile.js/config/webpack`) to fit your project. For smaller one-pagers, you'll probably want to skip the async stuff, and just compile a single bundle.

#### CSS
```
gulpfile.js/tasks/sass
```
Your Sass gets run through Autoprefixer, so don't prefix! The examples use the indented `.sass` syntax, but use whichever you prefer.

#### HTML
```
gulpfile.js/tasks/html
```
Robust templating with [Nunjucks](https://mozilla.github.io/nunjucks/). Nunjucks is nearly identical in syntax to Twig (PHP), and replaces Swig, which is no longer maintained.

#### Fonts
```
gulpfile.js/tasks/fonts
```
All this task does is copy fonts from `./src/fonts` to `./public/fonts`. A sass `+font-face` mixin is included in `./src/stylesheets/base/mixins`.

#### IconFont
```
gulpfile.js/tasks/iconFont
```
SVGs added to `src/icons` will be automatically compiled into an iconFont, and output to `./public/fonts`. At the same time, a `.sass` file will be output to `src/stylesheets/generated/_icons.sass`. This file contains mixins and classes based on the svg filename. If you want to edit the template that generates this file, it's at `gulpfile.js/tasks/iconFont/template.sass`

##### Usage:
With classes:
```
<span class="icon -twitter"></span>
```

With mixins:
```sass
.lil-birdy-guy
  +icon--twitter
```

```scss
.lil-birdy-guy {
  @include icon--twitter;
}
```

```html
<span class="lil-birdy-guy"></span>
```

*Don't forget about accessibility!*

```html
<span aria-label="Twitter" class="icon -twitter"></span>
<!-- or -->
<div class="icon -twitter"><span class="screen-reader">Twitter</span></div>
```

#### SVG Sprites
```
gulpfile.js/tasks/iconFont
```
SVGs sprites are super powerful. This particular setup allows styling 2 different colors from your css. You can have unlimited colors hard coded into your svg.  

In the following example, the first path will be `red`, the second will be `white`, and the third will be `blue`. Paths **without a fill attribute** will inherit the `fill` property from css. Paths with **fill="currentColor"** will inherit the current css `color` value, and hard-coded fills will not be overwritten, since inline styles trump css values.

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

I've included a helper to generate the required svg markup in `src/html/macros/helpers.html`, so you can just do:
```html
  {{ sprite('my-icon') }}
```
Which spits out:

```html
  <span class='sprite -my-icon'>
    <svg viewBox="0 0 1 1"><use xlink:href='images/spritesheets/sprites.svg#my-icon' /></use></svg>
  </span>
```

I recommend setting up your SVGs on a 500 x 500 canvas, centering your artwork, and expanding/combining any shapes of the same color. This last step is important.

### Tests
```
  npm run test
```
Test files located in `__tests__` folders are picked up and run using
[Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/). The test script right now first compiles a production build, and then, if successful runs Karma. This is nice when using something like [Travis CI](https://travis-ci.org/greypants/gulp-starter) in that if an error occurs during the build step, Travis alerts me that it failed. To pass, the files have to compile properly AND pass the JS tests.

### Build production-ready files
```
npm run production
```

This will compile revisioned and compressed files to `./public`. If you want to preview the built production files on a local static server, after running this task, run:

```
npm start
```

This will start a static production server viewable at http://localhost:5000.

### Deploy to gh-pages
```
npm run deploy
```
This will compile production code and push the contents of `./public` to a gh-pages branch, viewable at http://[your-username].github.io/[your-repo-name]. Be sure to update your username in the config.

GitHub Pages isn't the most robust of hosting solutions (you're going to run into relative path issues), but it's a great place to quickly share in-progress work, and you get it for free.

[Divshot](https://divshot.com/) and [Surge.sh](http://surge.sh/) are a couple great alternatives for more production-ready static hosting to check out, and are just as easy to deploy to.

#

## Notable changes from 1.0
- Full asset pipeline and static html compilation
- `gulpfile.js` is now a directory
- update directory structure
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

[![Build Status](https://travis-ci.org/greypants/gulp-starter.svg?branch=static-server)](https://travis-ci.org/greypants/gulp-starter)

Made with ♥ at [Viget](http://viget.com)!
