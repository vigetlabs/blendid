var assert = require('chai').assert
var pathToUrl = require('../pathToUrl')

describe('pathToUrl', function() {
  it('converts Windows paths to a url path', function() {
    var urlPath = pathToUrl("\\Foo\\bar\\baz")
    assert.equal(urlPath, '/Foo/bar/baz')
  })

  it('joins Windows paths into a url path', function() {
    var urlPath = pathToUrl("\\Foo\\bar\\baz", '\\1234')
    assert.equal(urlPath, '/Foo/bar/baz/1234')
  })

  it('normalizes Windows path segments', function() {
    var joinedPath = pathToUrl('\\','\\\\Foo', 'bar', 'baz\\')
    assert.equal(joinedPath, '/Foo/bar/baz/')
  })

  it('does not change normal unix paths', function() {
    var normalPath = pathToUrl('/Foo/bar/baz/')
    assert.equal(normalPath, '/Foo/bar/baz/')
  })

  it('normalizes unix path segments', function() {
    var joinedPath = pathToUrl('/','//Foo', 'bar', 'baz/')
    assert.equal(joinedPath, '/Foo/bar/baz/')
  })
})
