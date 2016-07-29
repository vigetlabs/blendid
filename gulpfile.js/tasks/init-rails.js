var gulp = require('gulp')
var gutil = require('gulp-util')

gulp.task('init-rails', function() {
  var stream = gulp.src(['extras/rails/**/*', '*!README.md'])
    .pipe(gulp.dest(process.env.PWD))

  gutil.log(gutil.colors.green('Created app/helpers/gulp_asset_helper.rb'))
  gutil.log(gutil.colors.green('Created config/initializers/gulp.rb'))
  gutil.log(gutil.colors.green('Created config/deploy.rb.example'))
  gutil.log(
gutil.colors.yellow(`

Using Capistrano? Add the following to deploy.rb so assets will compile on deploy:
`), gutil.colors.magenta(`
before "deploy:assets:precompile", "deploy:npm_install"

namespace :deploy do
  desc "Run npm install"
  task :npm_install do
    invoke_command "bash -c '. /home/deploy/.nvm/nvm.sh && cd #{release_path} && npm install'"
  end
end
`), gutil.colors.yellow(`
and add 'public/assets' to your .gitignore file.
`))

  return stream
})
