#![Gulp Starter](src/images/gulp-starter-logo.png)

Gulp Starter is a delicious blend of tasks and build tools poured into [Gulp](http://gulpjs.com/) to form a full-featured modern asset pipeline. It can be used as-is as a static site builder, or can be configured and integrated into your own development environment and site or app structure. 

[![Build Status](https://travis-ci.org/vigetlabs/gulp-starter.svg?branch=static-server)](https://travis-ci.org/vigetlabs/gulp-starter)

```bash
git clone https://github.com/vigetlabs/gulp-starter.git MyApp
cd MyApp
npm install
npm run gulp
```

**Demo compiled with gulp-starter:** http://vigetlabs.github.io/gulp-starter/

(view files on [gh-pages](https://github.com/vigetlabs/gulp-starter/tree/gh-pages) branch)

## Features
- **CSS:** [Sass](http://sass-lang.com/) (indented, scss, or both)
  - Libsass (node-sass) for super fast compiles
  - Autoprefixer
- **JS:** Modular ES6 with [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/)
  - Async requires
  - Multiple bundles
  - Shared modules
  - Source Maps
- **HTML**: Static templating with [Nunjucks](https://mozilla.github.io/nunjucks/) and [gulp-data](https://github.com/colynb/gulp-data)
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
npm run gulp
```

(or `npm run development`)

This runs `gulp` from `./node_modules/bin`, using the version installed with this project, rather than a globally installed instance. All commands in the package.json `scripts` work this way. The `gulp` command runs the `default` task, defined in `gulpfile.js/tasks/default.js`. 

All files will compile in development mode (uncompressed with source maps). [BrowserSync](http://www.browsersync.io/) will serve up files to `localhost:3000` and will stream live changes to the code and assets to all connected browsers. Don't forget about the additional BrowserSync tools available on `localhost:3001`!

To run any other existing task, simply add the task name after the `gulp` command. Example:

```bash
npm run gulp build:production
```

#### Configuration
Directory and top level settings are convienently exposed in `gulpfile.js/config.js`. All task configuration objects have `src` and `dest` directories specfied. These are relative to `root.src` and `root.dest` respectively. Each configuration also has an extensions array. This is used for file watching, and file deleting/replacing. 

If there is a feature you do not wish to use on your project, simply delete the configuration, and the task will be skipped. 

### Run JavaScript Tests
```
npm run test
```
Test files located in `__tests__` folders are picked up and run using
[Karma](http://karma-runner.github.io/0.12/index.html), [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), and [Sinon](http://sinonjs.org/). The test script right now first compiles a production build, and then, if successful runs Karma. This is nice when using something like [Travis CI](https://travis-ci.org/vigetlabs/gulp-starter) in that if an error occurs during the build step, Travis alerts me that it failed. To pass, the files have to compile properly AND pass the JS tests.

### Build production-ready files
```
npm run production
```

This will compile revisioned and compressed files to `./public` and start a static server that serves your production files to http://localhost:5000. This is primarily meant as a way to preview your production build locally, not necessarily for use as a live production server.

### Deploy to gh-pages
```
npm run deploy
```
This task compiles production code and then uses [gulp-gh-pages](https://github.com/shinnn/gulp-gh-pages) to push the contents of your `dest.root` to a `gh-pages` (or other specified) branch, viewable at http://[your-username].github.io/[your-repo-name]. Be sure to update the `homepage` property in your `package.json`.

GitHub Pages isn't the most robust of hosting solutions (you'll eventually run into relative path issues), but it's a great place to quickly share in-progress work, and you get it for free.

[Divshot](https://divshot.com/) and [Surge.sh](http://surge.sh/) are a couple great alternatives for production-ready static hosting to check out, and are just as easy to deploy to. Where ever you're deploying to, all you need to do is `npm run gulp build:production` and transfer the contents of the `public` folder to your server however you see fit.

# Task Details
#### JS
```
gulpfile.js/tasks/webpack-development
```
Modular ES6 with [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/)

I've included various examples of generating mulitple files, async module loading and splitting out shared dependences to show the power of Webpack. Adjust the webpack config (`.gulpfile.js/config/webpack`) to fit your project. For smaller one-pagers, you'll probably want to skip the async stuff, and just compile a single bundle.

There are a couple of webpack options exposed in the top-level `gulpfile.js/config.js` file.

`entries`: Discrete js bundle entry points. A js file will be bundled for each item. Paths are relative to the `javascripts` folder. This maps directly to `webpackConfig.entry`.

`extractSharedJs`: Creates a `shared.js` file that contains any modules shared by multiple bundles. Useful on large sites with descrete js running on different pages that may share common modules or libraries. Not typically needed on smaller sites.

If you want to mess with the specifics of the webpack config, check out `gulpfile.js/lib/webpack-multi-config.js`.

#### CSS
```
gulpfile.js/tasks/css
```
Your Sass gets run through Autoprefixer, so don't prefix! The examples use the indented `.sass` syntax, but use whichever you prefer.

#### HTML
```
gulpfile.js/tasks/html
```
Robust templating with [Nunjucks](https://mozilla.github.io/nunjucks/). Nunjucks is nearly identical in syntax to Twig (PHP), and replaces Swig (and Twig-like js templating language), which is no longer maintained.

A global data file is set up at [src/html/data/global.json](src/html/data/global.json), is read in by the `html` task, and exposes the propertiesto your html templates. See [social-icons-font.html](src/html/shared/social-icons-font.html) for example usage.

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
With generated classes:
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
gulpfile.js/tasks/svgSprite
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

**Check out other open source work happening at [Viget](http://viget.com) on [code.viget.com](http://code.viget.com)**
