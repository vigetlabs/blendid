import _ from 'lodash'

// Contrived example to demonstrate a dependecy shared between bundles
const message = _.compact(['lodash', '', '', 'is NOT bundled with', '', '','page.js']).join(' ')
export default message
