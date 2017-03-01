# JavaScript Assets
We've got modular ES6 with [Babel](http://babeljs.io/) and [Webpack](http://webpack.github.io/)!

I've included a couple boilerplate files. `__tests__` contains a dummy test file to remind you to test your code! I've also included a module/feature initialization pattern I've found helpful on projects. [In the demo](/extras/demo), I've included additional examples of generating mulitple files, async module loading and splitting out shared dependences to show the power of Webpack. 

In development, JavaScript is compiled with [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) by [passing these into BrowserSync](gulpfile.js/tasks/browserSync.js#L14-L19) as [middleware](https://browsersync.io/docs/options/#option-middleware). You don't have to take advantage of [webpack hot module replacement](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack), but it's there if you want it! I use it on all my React.js projects with things like [react-transform-hmr](https://github.com/gaearon/react-transform-hmr). But before you go and do that, read [Dan Abramov's disclaimer](https://medium.com/@dan_abramov/hot-reloading-in-react-1140438583bf#.jhcp6x3rl), which is also a great tutorial on using vanilla Webpack HMR.

### Tasks and Files
```
gulpfile.js/tasks/browserSync
gulpfile.js/tasks/webpackProduction
gulpfile.js/lib/webpack-multi-config
```

There are numerious options exposed in the top-level `gulpfile.js/config.json` file.

#### `hot`

#### Defaults:
```js
hot: {
  enabled: true,
  reload: true,
  react: false
}
```

By default, the browser will do a full browser refresh if hot-loading isn't set up in your app. If you're using, React, set `react: true` to enable [react-hot-loader](https://github.com/gaearon/react-hot-loader)

##### `entries`
Discrete js bundle entry points. A js file will be bundled for each item. Paths are relative to the `javascripts` folder. This maps directly to `webpackConfig.entry`.

##### `extractSharedJs`
Creates a `shared.js` file that contains any modules shared by multiple bundles (don't forget to include that on the page!). Useful on large sites with discrete js running on different pages that may share common modules or libraries. For smaller sites, you'll probably want to skip the async stuff, and just compile a single bundle by setting `extractSharedJs` to `false`

##### `babel`
Object to overwrite the default Babel config object. The default is:

```js
{
  presets: ['es2015', 'stage-1']
}
```

##### `babelLoader`
Object to extend the default config for entire Babel loader object. See [Webpack loader documentation](https://webpack.github.io/docs/loaders.html#loaders-by-config) for details. 

##### `provide`
Key value list of variables that should be provided for modules to resolve dependencies on import using [ProvidePlugin](https://webpack.github.io/docs/list-of-plugins.html#provideplugin) 

##### `plugins`
Define additional webpack plugins that should be used in all environments

##### `loaders`
Define additional webpack loaders that should be used in all environments

##### `development`, `test`, `production`
Define additional webpack plugins and loaders for development, test or production environment
```js
development: {
  plugins: (webpack) => { return [ new webpack.IgnorePlugin(/jsdom$/) ] },
  loaders: []
}
```

#### Advanced
If you want to mess with the specifics of the webpack config, check out `gulpfile.js/lib/webpack-multi-config.js`.
