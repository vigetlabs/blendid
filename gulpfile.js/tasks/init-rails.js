var gulp = require('gulp')
var gutil = require('gulp-util')

gulp.task('init-rails', function() {
  var stream = gulp.src(['extras/rails/**/*', '*!README.md'])
    .pipe(gulp.dest(process.env.PWD))

  gutil.log(gutil.colors.green('Created app/helpers/blendid_asset_helper.rb'))
  gutil.log(gutil.colors.green('Created config/initializers/blendid.rb'))
  gutil.log(gutil.colors.green('Created config/deploy.rb.example'))
  gutil.log(
gutil.colors.yellow(`

Using Capistrano? Add the following to deploy.rb so assets will compile on deploy:
`), gutil.colors.magenta(`
namespace :deploy do
  namespace :npm do
    task :install, :roles => :app do
      # Install NPM dependencies in development mode because the build command
      # gets invoked on the server
      run "cd #{release_path} && yarn && yarn run build"
    end
  end
end

# Run NPM install after assets:precompile
before "deploy:assets:precompile", "deploy:npm:install"

`), gutil.colors.magenta(`

Make sure to add 'public/assets' to your .gitignore file.

`), gutil.colors.magenta(`
Update the script and stylesheet tags in your layout with the blendid asset helpers:

<link rel="stylesheet" href="<%= blendid_css_path('app.css') %>" />
<script src="<%= blendid_js_path('app.js') %>"></script>
`))

  return stream
})
