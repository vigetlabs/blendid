var gulp         = require('gulp')
var notify       = require('gulp-notify')
var watch        = require('gulp-watch')
var gulpShopify  = require('gulp-shopify-upload')
var pkg          = require('../../shopify_api.json')
var handleErrors = require('../lib/handleErrors')

gulp.task('shopifywatch', function() {
  return watch('./+(assets|config|layout|snippets|templates|locales)/**')
    .on('error', handleErrors)
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
    .on('error', handleErrors)
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
