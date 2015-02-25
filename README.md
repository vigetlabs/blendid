gulp-starter
============
## Revisions
- Full asset pipeline and static html compilation
- New directory structure
- Add Swig templating
- Use gulp-watch to catch new files
- Production mode w/ compression + filename revisioning
- Remove old examples and extraneous dependecies
- Upgrade dependencies (BrowserSync 2!)
- Move browserify transform options out of package.json

## Run it
```
npm install
```

Start editing assets and views from the `gulp/assets` and `gulp/views` folder. Files compile to `public`.

## Notes
```
NODE_ENV=production gulp
```
Set `NODE_ENV` to `production` on your server to enable file revisioning and compression.
