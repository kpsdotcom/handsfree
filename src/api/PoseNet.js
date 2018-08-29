/**
 * PoseNet.js
 *
 * Methods related to PoseNet
 */
const PoseNet = require('@tensorflow-models/posenet')

module.exports = function (Handsfree) {
  /**
   * Initializes PoseNet and starts the tracking loop:
   * [-] Loads a model from Google's servers based on the chosen PoseNet modifier
   */
  Handsfree.initPoseNet = async function () {
    if (!this.posenet) this.posenet = await PoseNet.load(this.settings.posenet.multiplier)
  }

  /**
   * Recursive method for tracking poses on each animationFrame:
   * - This method is recursive, once called it continues until after
   *    handsfree.stop() is called or until this._isTracking is false
   *
   * @param {Handsfree} context The this context, since we're in the
   *    constructor scope now
   */
  Handsfree.trackPosesLoop = function (context) {
    context.posenet && context.trackPoses()
    if (context.poses) {
      context.runCalculations()
      context.emitEvents()
    }

    context._isTracking && requestAnimationFrame(() => this.trackPosesLoop(context))
  }
}
