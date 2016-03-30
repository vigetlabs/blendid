var assert = require('chai').assert
var pathToUrl = require('../pathToUrl')

describe('pathToUrl', function() {
  it('converts a windows path to a url path', function() {
    var windowsPath = "\\Foo\\bar\\baz-1234"
    var urlPath = pathToUrl(windowsPath)
    assert.equal(urlPath, '/Foo/bar/baz-1234')
  })

  it('does nothing to a unix path', function() {
    var unixPath = "/Foo/bar/baz-1234"
    var urlPath = pathToUrl(unixPath)
    assert.equal(urlPath, unixPath)
  })
})
