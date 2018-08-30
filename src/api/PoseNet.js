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



  /**
   * Either assigns passed poses or estimates new poses
   * - Automatically adjusts algorithm to match "single" or "multiple mode"
   * - If debug is on, displays the points and skeletons overlays on the webcam
   *
   * @param {Null|Array} poses Either null to estimate poses, or an array of poses to track
   */
  Handsfree.prototype.trackPoses = async function (poses = null) {
    if (!poses) {
      // Get single pose
      if (this.settings.posenet.maxUsers === 1) {
        let pose = await this.posenet.estimateSinglePose(this.video, this.settings.posenet.imageScaleFactor, false, this.settings.posenet.outputStride)
        poses = [pose]
        // Get multiple poses
      } else {
        poses = await this.posenet.estimateMultiplePoses(
          this.video, this.settings.posenet.imageScaleFactor, false, this.settings.posenet.outputStride,
          this.settings.posenet.maxUsers, this.settings.posenet.scoreThreshold, this.settings.posenet.nmsRadius)
      }
    }

    // Publicly set poses
    this.poses = poses

    // Only draw when debug is on
    this.settings.debug && poses && this.debugPoses()
  }

  /**
   * Loops through each pose and draws their keypoints/skeletons
   * - Draws skeletons and keypoints
   */
  Handsfree.prototype.debugPoses = function () {
    const context = this.canvas.getContext('2d')
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.poses.forEach(({score, keypoints}) => {
      if (score >= this.settings.posenet.minPoseConfidence) {
        const adjacentKeypoints = PoseNet.getAdjacentKeyPoints(keypoints, this.settings.posenet.minPartConfidence, context)

        Handsfree.drawSkeleton(adjacentKeypoints, context)
        Handsfree.drawKeypoints(keypoints, this.settings.posenet.minPartConfidence, context)
      }
    })
  }
}
