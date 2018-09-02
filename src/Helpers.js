/**
 * Helpers.js
 *
 * A collection of helpers methods which may be helpful in your app outside
 * the context of Handsfree
 */
const PoseNet = require('@tensorflow-models/posenet')

module.exports = function (Handsfree) {
  /**
   * Helpers for checking if we're on mobile
   * - Checks if we're on mobile
   * - Checks if we're on android
   * - Checks if we're on iOS
   */
  Handsfree.isMobile = function () { return Handsfree.isAndroid() || Handsfree.isiOS() }
  Handsfree.isAndroid = function () { return /Android/i.test(navigator.userAgent) }
  Handsfree.isiOS = function () { return /iPhone|iPad|iPod/i.test(navigator.userAgent) }

  /**
   * Checks if WebGL is supported. Depending on your deployment needs,
   * you can first check if WebGL is supported with this method, and then either
   * display a message or start the tracker.
   *
   * - This will automatically fail if canvas is not supported!
   * - Checks for webgl and experimental-webgl
   *
   * @see https://stackoverflow.com/a/22953053
   *
   * @param {Boolean} forceThrow (Optional) Whether to force throw an error. This is mostly for unit testing to test failures
   * @return {Boolean} Is WebGL supported?
   */
  Handsfree.isWebGLSupported = function (forceThrow = false) {
    try {
      if (forceThrow) throw(forceThrow)

      let canvas = document.createElement('canvas')
      let isSupported = true

      if (!canvas.getContext('webgl') || !canvas.getContext('experimental-webgl')) isSupported = false
      canvas.remove()

      return !!isSupported
    } catch (e) {
      console.error(e)
      return false
    }
  }

  /**
   * Converts a position to a tuple
   * - Essentially converts an {x, y} object into a [y, x] array
   *
   * @param {OBJ} position {x, y}
   */
  Handsfree.toTuple = function ({x, y}) { return [y, x] }
}
