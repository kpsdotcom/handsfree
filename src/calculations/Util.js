/**
 * calculations/Util.js
 * - Calculates utility/helper variables
 */
module.exports = function (Handsfree) {
  /**
   * Catches window-dimensions based variables
   */
  Handsfree.cacheWindowBasedVariables = function () {
    this.cache.window = {
      height: window.outerHeight,
      width: window.outerWidth,
      canvasRatio: {
        width: window.outerWidth / this.canvas.width,
        height: window.outerHeight / this.canvas.height
      }
    }
  }

  /**
   * Entrypoint for calculating utilities, which adds:
   * .eyeDistance
   * .eyeCenter
   * .distanceFromScreen
   */
  Handsfree.prototype.calculateUtils = function (pose, index) {
    const eye = {
      l: pose.keypoints[1].position,
      r: pose.keypoints[2].position
    }
    let a = eye.l.x - eye.r.x
    let b = eye.l.y - eye.r.y

    // Distance between eyes
    this.poses[index].eyeDistance = pose.eyeDistance = Math.sqrt(a*a + b*b)
    // How far away the user is in units
    this.poses[index].distanceFromScreen = this.canvas.width / pose.eyeDistance
    // The center point between the eyes
    this.poses[index].eyeCenter = pose.eyeCenter = {
      x: (eye.l.x + eye.r.x) / 2,
      y: (eye.l.y + eye.r.y) / 2
    }
  }
}
