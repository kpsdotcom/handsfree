/**
 * Calculations.js
 *
 * A collection of methods for calculating things
 */
const forEach = require('lodash/forEach')

module.exports = function (Handsfree) {
  const normalize = (val, max, min) => (val - min) / (max - min)

  /**
   * Run calculations
   */
  Handsfree.prototype.runCalculations = function () {
    this.poses && this.poses.forEach((pose, index) => {
      const partNames = ['nose', 'eyeR', 'eyeL']

      // Core calculations
      pose.part = {}
      partNames.forEach((partName, i) => {
        const position = pose.keypoints[i].position
        pose.part[partName] = {
          position,
          normal: {
            x: normalize(position.x, 0, window.outerWidth),
            y: normalize(position.x, 0, window.outerHeight)
          }
        }
      })

      // @FIXME let's only calculate the one's we need, like only the eyes and nose
      this.poses[index] = pose
    })
  }
}
