var gulp = require('gulp');

// If you are familiar with Rails, this is the equivalent of `rake assets:precompile`
gulp.task('production', [
  // 1) Add md5 hashes to assets referenced by CSS and JS files
  'rev-assets',
  // 2) Manually hash EOT, TTF, and WOFF files
  'rev-font-workaround',
  // 3) Update asset references with reved filenames in compiled css + js
  'rev-update-references',
  // 4) Rev and compress CSS and JS files (this is done after assets, so that if
  //    a referenced asset hash changes, the parent hash will change as well
  'rev-css-js-compress',
  // 5) Update asset references in HTML
  'update-html',
  // 6) Report filesizes
  'size-report'
]);
