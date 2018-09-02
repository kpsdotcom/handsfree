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
   * Finds the slope between two points
   * @param  {Point} a The first point
   * @param  {Point} b The second point
   * @return {Point}   The slope betweent the two points degress
   */
  const pointDeg = (b, a) => -radToDeg(Math.atan2(a.y - b.y, b.x - a.x))

  /**
   * Finds the distance between two points
   * @param  {Point} p1 The first point
   * @param  {Point} p2 The second point
   * @return {Point}   The slope betweent the two points degress
   */
  const distance = (p1, p2) => {
    const a = p1.x - p2.x
    const b = p1.y - p2.y
    return Math.sqrt(a*a + b*b)
  }

  /**
   * Turns a radian to degrees
   * @param  {Number} rad The radian
   * @return {Number}     The degrees
   */
  const radToDeg = (rad) => rad * (180 / Math.PI)

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

      // Calculate roll
      pose.part.head = {}
      pose.part.head.width = distance(pose.part.eyeL.position, pose.part.eyeR.position)
      pose.part.head.roll = pointDeg(pose.part.eyeL.normal, pose.part.eyeR.normal)

      // @FIXME let's only calculate the one's we need, like only the eyes and nose
      this.poses[index] = pose
    })
  }
}
