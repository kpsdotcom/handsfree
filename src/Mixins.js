/**
 * Mixins.js
 *
 * A collection of additional, lower-priority methods.
 * @FIXME We should assign these to the prototype
 */
const PoseNet = require('@tensorflow-models/posenet')
const merge = require('lodash/merge')

module.exports = function (Handsfree) {
  /**
   * Applies aliases to common settings. Feel free to add your own in here
   * - Creates a shorthand to settings
   */
  Handsfree.setAliases = function () {
    this.video = this.settings.video
    this.canvas = this.settings.canvas
  }

  /**
   * Sets up the webcam and stream:
   * - This creates its own video/canvas elements, allowing you to have
   *    multiple instances going (for example, to use front/back cameras
   *    simultaneously)
   * - Recreates the video feed to reassign srcObject once it's been stopped
   */
  Handsfree.setupFeed = async function () {
    // Set webcam dimensions
    this.canvas.width = this.video.width = 600
    this.canvas.height = this.video.height = 500

    // Start the stream based on the device
    const isMobile = this.isMobile()
    this.video.srcObject = await navigator.mediaDevices.getUserMedia({
      // We only care about the camera
      audio: false,
      video: {facingMode: this.settings.facingMode},
      width: isMobile ? undefined : this.video.width,
      height: isMobile ? undefined : this.video.height
    })

    // Cache the area of the window
    this.cache.window.area = window.outerWidth * window.outerHeight

    this.video.play()
  }

  /**
   * @TODO Initializes PoseNet and starts the tracking loop:
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
   * @TODO Emits events
   * [-] Emits onHandsfreePoseUpdates with (this.poses, handsfree)
   */
  Handsfree.prototype.emitEvents = function () {
    window.dispatchEvent(new CustomEvent('onHandsfreePoseUpdates', {
      detail: {
        context: this
      }
    }))
  }

  /**
   * Updates the debug target
   *
   * @param {DOM} newTarget The new target
   * @param {DOM} oldTarget The new target
   */
  Handsfree.prototype.updateTarget = function (newTarget, oldTarget) {
    let numChildren = oldTarget.children.length

    for (let i = 0; i < numChildren; i++) {
      newTarget.appendChild(oldTarget.children[0])
    }

    this.stop()
    this.start()
  }
}
