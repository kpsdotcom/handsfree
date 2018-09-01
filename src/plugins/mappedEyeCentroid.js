/**
 * Draws a poses eye centroidi, assuming the canvas is fullscreen
 */
// Create the pointer and styles
const $pointer = document.createElement('div')
$pointer.classList.add('handsfree-plugin-mappedEyeCentroid-pointer')
const $style = document.createElement('style')
$style.type = 'text/css'
$style.appendChild(document.createTextNode(`
  .handsfree-plugin-mappedEyeCentroid-pointer {
    z-index: 999999;
    display: none;
    position: fixed;
    height: 30px;
    width: 30px;
    border-radius: 30px;
    background: rgba(0, 0, 0, 0);
    border: 3px dashed rgba(0, 0, 0, 0.35);
  }

  .handsfree-plugin-mappedEyeCentroid-pointer:before {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 40px 10px;
    border-color: transparent transparent rgba(0, 0, 0, 0.35) transparent;
  }
`))
document.body.appendChild($pointer)
document.body.appendChild($style)

// The plugin
module.exports = {
  name: 'mappedEyeCentroid',
  onStart () {$pointer.style.display = 'block'},
  onStop () {$pointer.style.display = 'none'},
  callback (pose) {
    $pointer.style.left = `${pose.part.eyeMidpoint.x * window.outerWidth}px`
    $pointer.style.top = `${pose.part.eyeMidpoint.y * window.outerHeight}px`
    $pointer.style.transform = `rotate(${pose.part.head.roll}deg)`
  }
}
