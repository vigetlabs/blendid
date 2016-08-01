# Image Assets

If you are using images (jpgs, pngs, gifs, svgs, etc.), this is the place to put them.

If you don't plan using images, feel free to delete this folder and the `tasks.images` config in `gulpfile.js/config.json`.

### Tasks and Files
```
gulpfile.js/tasks/images
```
The image task will copy them over to the destination specified in `config.json`.

This task formerly ran everything through image-min. This is a pretty heavy package, and not a task that really needs to be run every time. I recommend installing [imagemin-cli](https://github.com/imagemin/imagemin-cli) globally and manually running it on your source files from time to time, or use a tool like [ImageOptim](https://imageoptim.com) and [ImageAlpha](https://pngmini.com/).
