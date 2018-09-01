/**
 * Draws a poses eye centroidi, assuming the canvas is fullscreen
 */
const $pointer = document.createElement('div')
$pointer.classList.add('handsfree-plugin-mappedEyeCentroid-pointer')
$pointer.style.display = 'none'
$pointer.style.position = 'fixed'
$pointer.style.width = '20px'
$pointer.style.height = '20px'
$pointer.style.borderRadius = '20px'
$pointer.style.background = 'rgba(0, 0, 0, 0.25)'
document.body.appendChild($pointer)

module.exports = {
  name: 'mappedEyeCentroid',
  onStart (pose) {$pointer.style.display = 'block'},
  onStop (pose) {$pointer.style.display = 'none'}
}
