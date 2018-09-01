/**
 * Calculations.js
 *
 * A collection of methods for calculating things
 */
const forEach = require('lodash/forEach')

module.exports = function (Handsfree) {
  /**
   * Normalizes a val between min and max range
   * @param  {Number} val The value to normalize
   * @param  {Number} max The minimum range
   * @param  {Number} min The maximum range
   * @return {Number}     The normalized value
   */
  const normalize = (val, max, min) => (val - min) / (max - min)

  /**
   * Finds the center {x, y} between two {x, y}'s
   * @param  {Point} a The first point
   * @param  {Point} b The second point
   * @return {Point}   A point representing the center of the two
   */
  const midpoint = (a, b) => {return {x: (a.x + b.x) / 2, y: (a.y + b.y) / 2}}

  /**
   * Run calculations
   */
  Handsfree.prototype.runCalculations = function () {
    this.poses && this.poses.forEach((pose, index) => {
      const partNames = ['nose', 'eyeR', 'eyeL']

      // Adds calcuations to pose.part by partName
      pose.part = {}
      partNames.forEach((partName, i) => {
        // Add Properties
        const position = pose.keypoints[i].position
        pose.part[partName] = {
          position,
          score: pose.keypoints[i].score,
          // Canvas Normals: each pixel the canvas is between 0 and 1
          normal: {
            x: normalize(position.x, 0, this.canvas.width),
            y: normalize(this.canvas.height - position.y, 0, this.canvas.height)
          }
        }
      })

      // Calculate eye midpoint
      pose.part.eyeMidpoint = midpoint(pose.part.eyeL.normal, pose.part.eyeR.normal),

      // @FIXME let's only calculate the one's we need, like only the eyes and nose
      this.poses[index] = pose
    })
  }
}
