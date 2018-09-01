// Demo setup
require('spectre.css')
require('../assets/style.styl')

// Let's make these global to make dev easier
window.handsfree = new HandsfreeModule({debug: true})

// load plugins
window.handsfree.use(require('plugins/mappedEyeCentroid'))
