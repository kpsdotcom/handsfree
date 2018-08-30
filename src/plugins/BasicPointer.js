/**
 * Creates a basic pointer for each tracked pose
 */
module.exports = function (Handsfree) {
  const $pointer = document.createElement('div')
  const settings = {
    pointerSize: 20,
    sensitivity: 1,
    background: [255, 0, 0],
    borderColor: [255, 255, 255],
    opacity: 0.8
  }

  // Add pointer styles
  $pointer.classList.add('handsfree-basic-pointer')
  $pointer.style.left = '-100px'
  $pointer.style.top = '-100px'
  $pointer.style.position = 'fixed'
  $pointer.style.zIndex = 99999999
  document.body.appendChild($pointer)

  /**
   * Positions a cursor
   */
  Handsfree.prototype.use({
    name: 'BasicPointer',
    priority: 0,
    disabled: false,

    /**
     * Position the cursor
     */
    callback ({x, y}) {
      $pointer.style.left = `${x * settings.sensitivity}px`
      $pointer.style.top = `${y * settings.sensitivity}px`
      settings.pointerSize = this.poses[0].distanceFromScreen * 4
      updateStyles()
    },

    /**
     * "Hide" the cursor
     */
    onStop () {
      $pointer.style.left = '-100px'
      $pointer.style.top = '-100px'
    },

    /**
     * Add UI components
     */
    onLoad () {
      const folder = this.gui.addFolder('Basic Pointer')
      folder.add(settings, 'pointerSize', 5, 100).onChange(updateStyles)
      folder.add(settings, 'sensitivity', 0.001, 4)
      folder.addColor(settings, 'background').onChange(updateStyles)
      folder.addColor(settings, 'borderColor').onChange(updateStyles)
      folder.add(settings, 'opacity', 0, 1).onChange(updateStyles)
    }
  })

  /**
   * Update styles
   */
  const updateStyles = function () {
    $pointer.style.width = `${settings.pointerSize}px`
    $pointer.style.height = `${settings.pointerSize}px`
    $pointer.style.marginLeft = `${settings.pointerSize / -2}px`
    $pointer.style.marginTop = `${settings.pointerSize / -2}px`
    $pointer.style.borderRadius = `${settings.pointerSize / 2 + 6}px`
    $pointer.style.background = `rgb(${settings.background[0]}, ${settings.background[1]}, ${settings.background[2]})`
    $pointer.style.border = `2px solid rgb(${settings.borderColor[0]}, ${settings.borderColor[1]}, ${settings.borderColor[2]})`
    $pointer.style.opacity = settings.opacity
  }
  updateStyles()
}
