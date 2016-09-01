# Gulp Starter on Craft

## Gulp Rev Craft Plugin
Include the proper gulp-revisioned version of an asset in your Twig templates with this plugin.

###Usage:

```twig
<link rel="stylesheet" href="{{ 'assets/stylesheets/app.css' | gulp_rev }}">
```


The output of the Twig filter defaults to the given string/path unless `rev-manifest.json` exists. When `rev-manifest.json` exists, then the string is replaced with the revisioned asset name stored in that file.


###Important Notes:
* The plugin assumes that your `rev-manifest.json` file is in the public folder.
* Make sure `rev-manifest.json` does not exist when running `npm run gulp` (the development task). This will cause an error since the revisioned file will not exist.
* Asset paths output by the Twig filter are forced to start with a "/" if it doesn't already exist.


###To install:
* Drop the `gulprev` directory into `craft/plugins` within your Craft build
* Enable the plugin at `/settings/plugins` in the Craft Admin
* Start using the Twig filter in your templates
