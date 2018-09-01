// Demo setup
require('spectre.css')
require('../assets/style.styl')

// Let's make these global to make dev easier
window.handsfree = new HandsfreeModule({debug: true})

// load plugins
window.handsfree.use(require('plugins/mappedEyeCentroid'))

// Log data
const $x = document.querySelector('#x')
const $y = document.querySelector('#y')
const $roll = document.querySelector('#roll')
window.addEventListener('onHandsfreePoseUpdates', function (e) {
  const me = e.detail.context
  $x.innerText = me.poses[0].part.eyeMidpoint.x
  $y.innerText = me.poses[0].part.eyeMidpoint.y
  $roll.innerText = me.poses[0].part.head.roll
})
