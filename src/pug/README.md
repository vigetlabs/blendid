# Pug Assets
If you are using gulp-starter with another platform that handles markup, delete this folder and the `pug` config in `gulpfile.js/task-config.js`, and don't forget to [configure BrowserSync to watch your platform's template files](https://browsersync.io/docs/options/#option-files) for changes!

If you are using gulp-starter as a standalone static site builder, this is where your markup goes. I've provided a few folders and files to get you started:

- **data:** contains a `global.json` file where you can put data that will be made accessible to your templates
- **layouts:** A basic Pug layout file
- **shared:** A folder to put shared partials, with an empty `app-icons.pug` file to remind you to generate your favicons and app icons!
- **index-pug.pug:** Hello world! Uses `layouts/application.pug`.

### Tasks and Files
```
gulpfile.js/tasks/pug
```
Templating with Pug.
Blendid supports adding custom options to Pug renderer via `task-config.js` by passing `pug.options`. For example:
```js
pug: {
  options: {
      pretty: false
  }
}
```

A global data file is set up at [src/pug/data/global.json](src/pug/data/global.json), is read in by the `pug` task, and exposes the properties to your pug templates. 
