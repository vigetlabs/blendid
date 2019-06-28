module.exports = function addPostCssPlugin(name, config) {
  let hasPlugin = !!TASK_CONFIG.stylesheets.postcss.plugins.find(p => p.postcssPlugin === name)
  if (!hasPlugin) {
    TASK_CONFIG.stylesheets.postcss.plugins.push(config)
  }
}
