# Gulp Starter on Craft

## Gulp Rev Craft Plugin
Include the proper gulp-revisioned version of an asset in your Twig templates with this plugin.

###Usage:

```<link rel="stylesheet" href="{{ 'assets/stylesheets/app.css' | gulp_rev }}">```


The output of the Twig filter defaults to the given string/path unless rev-manifest.json exists. When rev-manifest.json exists, then the string is replaced with the revisioned asset name.


###Important Notes:
* The plugin assumes that your rev-manifest.json file is in the public folder.
* Asset paths output by the Twig filter are forced to start with a "/" if it doesn't already exist.