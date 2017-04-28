## Gulp Server Task
This will start a static server that serves your production files to `http://localhost:5000`. This is primarily meant as a way to preview your production build locally, not necessarily for use as a live production server.

Addtional `devDependencies` needed:

```json
  "compression": "1.6.2",
  "express": "4.14.0",
  "morgan": "1.7.0",
  "open": "0.0.5",
```

## IconFont Task
```
gulpfile.js/tasks/iconFont
```

Addtional `devDependencies` needed:

```json
  "gulp-data": "1.2.1",
  "gulp-iconfont": "8.0.1",
  "gulp-nunjucks-render": "2.0.0",
  "gulp-rename": "1.2.2",
```

SVGs added to `src/icons` will be automatically compiled into an iconFont, and output to `./public/fonts`. At the same time, a `.sass` file will be output to `src/stylesheets/generated/_icons.sass`. This file contains mixins and classes based on the svg filename. If you want to edit the template that generates this file, it's at `gulpfile.js/tasks/iconFont/template.sass`. If you have the option, I'd recommend using SVG sprites (see below) over this method for icons.

##### Usage:
With generated classes:
```
<span class="icon -twitter"></span>
```

With mixins:
```sass
.lil-birdy-guy
  +icon--twitter
```

```scss
.lil-birdy-guy {
  @include icon--twitter;
}
```

```html
<span class="lil-birdy-guy"></span>
```

*Don't forget about accessibility!*

```html
<span aria-label="Twitter" class="icon -twitter"></span>
<!-- or -->
<div class="icon -twitter"><span class="screen-reader">Twitter</span></div>
```
