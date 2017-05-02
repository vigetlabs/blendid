# Blendid on Craft

## Gulp Rev Craft Plugin
Include the proper gulp-revisioned version of an asset in your Twig templates with this plugin.

### Usage:

```twig
<link rel="stylesheet" href="{{ 'assets/stylesheets/app.css' | gulp_rev }}">
```

The output of the Twig filter defaults to the given string/path unless `rev-manifest.json` exists. When `rev-manifest.json` exists, then the string is replaced with the revisioned asset path.


### Important Notes:
* By default, the plugin looks for your `rev-manifest.json` file in `/public/assets/rev-manifest.json`.
* To customize the path to your `rev-manifest.json`, go to `/admin/settings/plugins/gulprev` in the Craft Admin and change the setting for the file path.
* Make sure `rev-manifest.json` does not exist when running development environment task (when files are not versioned). This will cause an error since the versioned file will not exist.


### To install:
* Drop the `gulprev` directory into `craft/plugins` within your Craft build
* Enable the plugin at `/settings/plugins` in the Craft Admin
* Change the path to your `rev-manifest.json` in plugin settings if necessary
* Start using the Twig filter in your templates

## For additional configuration tips view the [wiki page](https://github.com/vigetlabs/blendid/wiki/Craft-Setup)
