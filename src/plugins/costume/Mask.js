/**
 * Draws a mask over the canvas debugger
 */
// Create the pointer and styles
const $mask = document.createElement('img')
$mask.src = 'https://i.imgur.com/KGCUsYc.png'
$mask.classList.add('handsfree-plugin-costume-mask-face')
const $style = document.createElement('style')
$style.type = 'text/css'
$style.appendChild(document.createTextNode(`
  .handsfree-plugin-costume-mask-face {
    z-index: 999999;
    position: fixed;
    height: auto;
    display: none;
  }
`))
document.body.appendChild($mask)
document.body.appendChild($style)

// The plugin
module.exports = {
  name: 'costume.mask',
  onStart () {$mask.style.display = 'block'},
  onStop () {$mask.style.display = 'none'},
  callback (pose) {
    const width = pose.part.head.width
    $mask.style.display = `block`
    $mask.style.width = `${width * 4}px`
    $mask.style.left = `${pose.part.eyeMidpoint.x * this.canvas.clientWidth + this.canvas.cache.boundingBoxes.left - width * 2}px`
    $mask.style.top = `${pose.part.eyeMidpoint.y * this.canvas.clientHeight + this.canvas.cache.boundingBoxes.top - $mask.height / 2}px`
    $mask.style.transform = `rotate(${pose.part.head.roll}deg)`
  }
}
