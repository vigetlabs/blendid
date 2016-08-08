# Static Assets
There are some files that belong in your root destination directory that you won't want to process or revision in production. Things like [favicons, app icons, etc.](http://realfavicongenerator.net/), should go in `src/static`, and will get copied over to `public` as a last step (after revisioning in production). *Nothing* should ever go directly in `public`, since it gets completely trashed and re-built when running the `default` or `production` tasks.

### Tasks and Files
```
gulpfile.js/tasks/static
```

Files are copied from this folder to the `root.dest` folder specified in `gulpfile.js/config.json`.
