/**
 * Creates a basic pointer for each tracked pose
 */
module.exports = function (Handsfree) {
  const $pointer = document.createElement('div')
  const pointerSize = 20

  $pointer.style.width = `${pointerSize}`
  $pointer.style.height = `${pointerSize}`
  $pointer.style.background = 'rgba(200, 0, 0, 0.7)'
  $pointer.style.border = '2px solid rgba(200, 0, 0, 0.9)'
  $pointer.style.position = 'fixed'
  $pointer.style.marginLeft = `${pointerSize / -2}px`
  $pointer.style.marginTop = `${pointerSize / -2}px`
  $pointer.style.borderRadius = `${pointerSize / 2}px`
  $pointer.style.zIndex = 999999999999999999999

  document.body.appendChild($pointer)

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
