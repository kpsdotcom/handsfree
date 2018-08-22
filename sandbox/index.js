// Demo setup
require('spectre.css')
require('../assets/style.styl')

// Let's make these global to make dev easier
window.handsfree = new HandsfreeModule({debug: true})

/**
 * Swaps target
 */
const targets = [
  document.getElementById('handsfree-debug'),
  document.getElementById('handsfree-debug-new-target')
]
let curTargetIndex = 0
window.updateTarget = function () { window.handsfree.update({target: targets[++curTargetIndex % 2]}) }
