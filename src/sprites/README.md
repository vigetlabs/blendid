#Sprites
*(see `rasterSprites` config in `gulpfile.js/config.json`)*

##tl;dr
Default configuration can be investigated/utilized with example image(s) located in this folder and css classes added to `/src/html/index.html`.

If sprite functionality is not desired, this folder and the 'rasterSprites' task can both be deleted.

##Details
Images (which may be `gif`, `jpg`, or `png`, and are configured in config.rasterSprites.imageTypes) that exist in here will be gathered into single spritesheets (grouped by filetype) .  Additional spritesheets will be made if subfolders are created.

After importing the appropriate generated sprite css (see **Process** below for details) to either the global or page appropriate CSS file, and executing the appropriate SASS macro (again, see **Process** below), sprite images may be included in html by assigning class to a block element, following this naming convention:

`sprite-([foldername]-)[file name]-[ext]`

*Simple example*

A file: `src/sprites/foo.png` could be referenced in html: 

    <div class="sprite-foo-png"></div>

*Subfolder example*

A file: `src/sprites/bar/foo.png` could be referenced in html: 

    <div class="sprite-bar-foo-png"></div>

##Process
Images of each file type in `config.rasterSprites.imageTypes[]`, located in the `config.rasterSprites.src` folder will be grouped (by file type and folder), into a single image file, and copied to `config.rasterSprites.dest`.
Meanwhile, the sprites css (SASS syntax, actually) will be generated and copied to `config.rasterSprites.sassSrcOutput`.  This file (or files) need to be explicitly imported into the appropriate source sass file.

*Example*

To include the default sprite stylesheet (defined in `config.rasterSprites.sheetName` with an underscore prepended to let SASS know it should not be included in generation by default), '_global-png.sass' in the `/stylesheets/app.sass` file:

    @import sprites/_global-png.sass        /* default path */
    @include sprites($global-png-sprites)   /* includes sprite classes */

The rest of the process is handled by the CSS task.






