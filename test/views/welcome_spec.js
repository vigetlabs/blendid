var Welcome = require('../../app/scripts/views/welcome.coffee');
var expect = require('chai').expect;

describe("Welcome", function(){

  beforeEach(function(){
    this.welcome = new Welcome();
  });

  it("should contain Gulp text", function(){
    expect(this.welcome.$el.html()).to.contain('Gulp');
  });

});
