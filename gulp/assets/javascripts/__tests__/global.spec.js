import message from '../global'

describe('global.coffee', () => {
  it('exports a message', () => {
    message.should.equal('global.js loaded!')
  })
})
