const moduleElements = document.querySelectorAll('[data-module]')

for (var i = 0; i < moduleElements.length; i++) {
  const el = moduleElements[i]
  const name = el.getAttribute('data-module')
  require.ensure([], function() {
    const Module = require(`./${name}`)
    new Module(el)
  })
}
