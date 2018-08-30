/**
 * calculations/Util.js
 * - Calculates utility/helper variables
 */
module.exports = function (Handsfree) {
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
    const a = eye.l.x - eye.r.x
    const b = eye.l.y - eye.r.y

    // Distance between eyes
    this.poses[index].eyeDistance = Math.sqrt(a*a + b*b)
    // How far away the user is in units
    this.poses[index].distanceFromScreen = this.canvas.width / this.poses[index].eyeDistance
    // The center point between the eyes
    this.poses[index].eyeCenter = {
      x: (eye.l.x + eye.r.x) / 2,
      y: (eye.l.y + eye.r.y) / 2
    }
  }
}
