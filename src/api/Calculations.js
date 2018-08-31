/**
 * Calculations.js
 *
 * A collection of methods for calculating things
 */
const merge = require('lodash/merge')
const forOwn = require('lodash/forOwn')
const once = require('lodash/once')
const tf = require('@tensorflow/tfjs')

module.exports = function (Handsfree) {
  const vals = Object.values

  /**
   * Run calculations
   */
  Handsfree.prototype.runCalculations = function () {
    this.poses && this.poses.forEach((pose, index) => {
      pose.norm = {
        nose: tf.softmax(vals(pose.keypoints[0].position)),
        leye: tf.softmax(vals(pose.keypoints[0].position)),
        reye: tf.softmax(vals(pose.keypoints[0].position)),
      }



      this.poses[index] = pose
    })
  }
}
