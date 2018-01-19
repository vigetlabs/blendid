var path = require('path')

/**
 * A function that can be used to resolve a path relatively to the
 * project directory.
 *
 * We often want to resolve paths relatively to the project root
 * directory. To do that, we use the `INIT_CWD` environment variable
 * provided by Gulp. This variable always resolves to the project
 * root directory so we use it as the seed path and then add the
 * remaining arguments passed and resolving everything using the
 * `path.resolve` function.
 *
 * The returned path is a fully resolved absolute path relative to
 * the project root directory.
 */
module.exports = function projectPath(...paths) {
  return path.resolve(process.env.INIT_CWD, ...paths);
}
