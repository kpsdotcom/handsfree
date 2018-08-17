// Demo setup
require('spectre.css')
require('../assets/style.styl')

// Let's make these global to make dev easier
window.HandsfreeModule = require('../src/Handsfree.js')
window.handsfree = new HandsfreeModule({autostart: true, debug: true})
