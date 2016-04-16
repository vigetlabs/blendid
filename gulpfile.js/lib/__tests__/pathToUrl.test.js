var assert = require('chai').assert
var pathToUrl = require('../pathToUrl')

describe('pathToUrl', function() {
  it('converts Windows paths to a url path', function() {
    var urlPath = pathToUrl("\\Foo\\bar\\baz")
    assert.equal(urlPath, '/Foo/bar/baz')
  })

  it('does not affect unix paths', function() {
    var unixPath = pathToUrl('/Foo/bar/baz/')
    assert.equal(unixPath, '/Foo/bar/baz/')
  })

  it('normalizes path segments', function() {
    var joinedPath = pathToUrl('/','//Foo', 'bar', 'baz/')
    assert.equal(joinedPath, '/Foo/bar/baz/')
  })
})
