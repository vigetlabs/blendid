# Static Assets
There are some files that belong in your root destination directory that you won't want to process or revision in production. Things like [favicons, app icons, etc.](http://realfavicongenerator.net/), should go in `src/static`, and will get copied over to `public` as a last step (after revisioning in production). *Nothing* should ever go directly in `public`, since it gets completely trashed and re-built when running the `default` or `production` tasks.

### Tasks and Files
```
gulpfile.js/tasks/static
```

Files are copied from this folder to the `root.dest` folder specified in `gulpfile.js/config.json`.


### Options
If you want to enable the task, and allow all files, simply set

```js
static: true
```

in `task-config.js`

Alternatively, you can specify the follwing options for more control:

#### `extentions`
Manually declare which file extentions you'd like to copy. This affects which files get watched for changes. If not set, all files are included.

#### `srcOptions`
Options passed to `gulp.src`. See [gulp documetation](https://github.com/gulpjs/gulp/blob/master/docs/API.md#options) for details.

Defaults to:

```js
static: {
  srcOptions: {
    dot: true // include dotfiles
  }
}
```
