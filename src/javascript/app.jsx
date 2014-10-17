/**
 * Module dependencies
 */

var path = require('./lib/path');

/**
 * Routes will be called in the order they are added
 */


path(require('./routes/parseRoute')); // parseRoute
path(require('./routes/loadPlayerData')); // load data
path(require('./routes/legacyRedirect')); // redirect to old player if no ctx.data.type is present
path(require('./routes/showPlayer')); // show player if data is present
path(require('./routes/notAvailable')); // check if video is available
path(require('./routes/noSources')); // check if video has sources aka is wrongly configured
path(require('./routes/notFound')); // show not found view if ctx.status = 404 at some point
path(); // start routing
