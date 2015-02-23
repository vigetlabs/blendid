import message from '../global'

describe('global.js', () => {
  it('exports a message', () => {
    message.should.equal('lodash is bundled with global.js')
  })
})
