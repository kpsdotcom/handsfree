/**
 * Creates a basic pointer for each tracked pose
 */
module.exports = function (Handsfree) {
  const $pointer = document.createElement('div')
  const pointerSize = 20

  // Add pointer styles
  $pointer.classList.add('handsfree-basic-pointer')
  $pointer.style.width = `${pointerSize}px`
  $pointer.style.height = `${pointerSize}px`
  $pointer.style.left = '-100px'
  $pointer.style.top = '-100px'
  $pointer.style.background = 'rgba(200, 0, 0, 0.7)'
  $pointer.style.border = '3px solid rgba(200, 200, 0, 0.9)'
  $pointer.style.position = 'fixed'
  $pointer.style.marginLeft = `${pointerSize / -2}px`
  $pointer.style.marginTop = `${pointerSize / -2}px`
  $pointer.style.borderRadius = `${pointerSize / 2 + 6}px`
  $pointer.style.zIndex = 99999999

  document.body.appendChild($pointer)

  /**
   * Positions a cursor
   */
  Handsfree.prototype.use({
    name: 'BasicPointer',
    priority: 0,
    disabled: false,
    callback: ({x, y}) => {
      $pointer.style.left = `${x}px`
      $pointer.style.top = `${y}px`
    }
  })
}
