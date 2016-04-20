var gulp        = require('gulp')
var plumber     = require('gulp-plumber')
var notify      = require('gulp-notify')
var watch       = require('gulp-watch')
var gulpShopify = require('gulp-shopify-upload')
var pkg         = require('../../shopify_api.json')

gulp.task('shopifywatch', function() {
  return watch('./+(assets|config|layout|snippets|templates|locales)/**')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(
      gulpShopify(
        pkg.api_key,
        pkg.api_password,
        pkg.store_url,
        null
      )
    )
    .pipe(notify({
      message: '<%= file.relative %> uploaded.'
    }));
});

gulp.task('shopifydeploy', function() {
  return gulp.src('./+(assets|config|layout|snippets|templates|locales)/**')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(
      gulpShopify(
        pkg.api_key,
        pkg.api_password,
        pkg.store_url,
        null
      )
    )
    .pipe(notify({
      message: 'Shopify deploy complete.',
      onLast: true
    }));
});
