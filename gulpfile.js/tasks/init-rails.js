var gulp = require('gulp')
var log = require('fancy-log')
var colors = require('ansi-colors')
var projectPath = require('../lib/projectPath')

gulp.task('init-rails', function() {
  var stream = gulp.src(['extras/rails/**/*', 'extras/rails/**/.gitkeep', '!**/ASSETS-README.md'])
    .pipe(gulp.dest(projectPath()))

  log(colors.green('Created app/helpers/blendid_asset_helper.rb'))
  log(colors.green('Created config/initializers/blendid.rb'))
  log(colors.green('Created config/deploy.rb.example'))
  log(
colors.yellow(`

Using Capistrano? Add the following to deploy.rb so assets will compile on deploy:
`), colors.magenta(`
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

`), colors.magenta(`

Make sure to add 'public/assets' to your .gitignore file.

`), colors.magenta(`
Update the script and stylesheet tags in your layout with the blendid asset helpers:

<link rel="stylesheet" href="<%= blendid_css_path('app.css') %>" />
<script src="<%= blendid_js_path('app.js') %>"></script>
`))

  return stream
})
