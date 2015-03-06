gulp-starter
============
## Revisions
- Full asset pipeline and static html compilation
- New directory structure
- New `html` task w/ Swig templating/compiling
- New `production-server` task to test production files locally
- New `deploy` task to deploy the public directory to gh-pages
- New `rev` task that revisions filenames and compress css and js
- Use `gulp-watch` instead of `gulp.watch` (correctly handles new files)
- Production mode w/ compression + filename revisioning
- Remove old examples and extraneous dependecies
- Upgrade dependencies (BrowserSync 2!)
- Move browserify transform options out of package.json
- Added example Travis CI integration that runs karma tests

## Run it
```
npm install
```

Start editing assets and views from the `gulp/assets` and `gulp/views` folder. Files compile to `public`.

## Preview production environment
```
gulp production-server
```

## Deploy to GitHub pages
```
gulp deploy
```
This will run karma, build your files, revision and compress them, and copy the contents of the public folder to a `gh-pages` branch, and push it up to GitHub.

[![Build Status](https://travis-ci.org/greypants/gulp-starter.svg?branch=static-server)](https://travis-ci.org/greypants/gulp-starter)
