gulp-starter
============

Starter gulpfile.js and structure with the following features:
- Compass
- LiveReload
- CoffeeScript (with source mapping!)
- Browserify (with Coffeeify)

### Install all dependencies
```
npm install
```

### Run gulp using CoffeeScript
```
gulp --require coffee-script
```

`gulpfile.js` is set up to watch sass, coffee, and html changes, and compile appropriately. The coffeeScript is set up to use the CommonJS module pattern with Browserify and Coffeeify. The `-dev` flag has been set to true, enabling `.coffee` source mapping in Chrome. Pretty cool!
