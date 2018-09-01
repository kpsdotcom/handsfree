/**
 * Draws a poses eye centroidi, assuming the canvas is fullscreen
 */
const $pointer = document.createElement('div')
$pointer.classList.add('handsfree-plugin-mappedEyeCentroid-pointer')
$pointer.style.display = 'none'
$pointer.style.position = 'fixed'
$pointer.style.width = '30px'
$pointer.style.height = '30px'
$pointer.style.borderRadius = '30px'
$pointer.style.background = 'rgba(0,0,0,0)'
$pointer.style.border = '3px dashed rgba(0,0,0,0.35)'
document.body.appendChild($pointer)

module.exports = {
  name: 'mappedEyeCentroid',
  onStart () {$pointer.style.display = 'block'},
  onStop () {$pointer.style.display = 'none'},
  callback (pose) {
    $pointer.style.left = `${pose.part.eyeMidpoint.x * window.outerWidth}px`
    $pointer.style.top = `${pose.part.eyeMidpoint.y * window.outerHeight}px`
  }
}
