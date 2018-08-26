/**
 * Handsfree.js
 *
 * This file contains all the "onboarding methods"; a glance at these methods
 * should give you a general understanding for how the app works!
 *
 * @NOTE: My personal convention for bullet points is:
 * [] Describes what this method *will do* 🤔 (todo's)
 * [-] Describes what this method *should be doing* 🤷 (needs testing)
 * - Describes what this method *does* 🏆 (tested)
 */
require('./polyfills')
const merge = require('lodash/merge')
const PoseNet = require('@tensorflow-models/posenet')
let HandsfreeModuleInstances = []

class Handsfree {
  /**
   * 🏆 Our main constructor
   * - Fails if getUserMedia is not supported
   * - Sanitizes settings and sets sane defaults
   * - Autostarts if settings.autostart
   * [] Creates the custom window event
   *
   * @param {Object} [opts={}] Constructor settings, @see /wiki/settings.md
   */
  constructor (opts = {}) {
    /**
     * Cache this instance
     */
    HandsfreeModuleInstances.push(this)

    /**
     * Whether we're tracking or not.
     *
     * @NOTE If manually set to false, this will break any active tracking loops
     * with unknown side effects. Use this.stop() instead!
     */
    this._isTracking = false

    /**
     * Collection of previously predicted points
     * - Each root-level index represents a pose
     * - Each pose is an array of the last X this.poses.[x].pointedAt's
     */
    this.poseStack = []

    /**
     * Whether the browser is supported or not
     * - This is mostly a helper property for testing
     */
    this._isSupported = false

    // Error out when webcams are not supported
    // @TODO Is there a better way handle this error?
    // @SEE https://github.com/LabOfOz/Handsfree/issues/15
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !this.isWebGLSupported()) {
      throw new Error('ERROR: This browser does not support webcams, please try another browser...like Google Chrome!')
    } else {
      // We know the browser has full support now
      this._isSupported = true

      // "Sanitize" constructor input
      this.update(opts)

      // Possibly autostart after plugins have been loaded
      this.settings.autostart && setTimeout(() => {this.start()}, 0)
    }
  }

  /**
   * Either assigns passed poses or estimates new poses
   * - Automatically adjusts algorithm to match "single" or "multiple mode"
   * - If debug is on, displays the points and skeletons overlays on the webcam
   *
   * @param {Null|Array} poses Either null to estimate poses, or an array of poses to track
   */
  async trackPoses (poses = null) {
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
  debugPoses () {
    const context = this.canvas.getContext('2d')

    this.poses.forEach(({score, keypoints}) => {
      if (score >= this.settings.posenet.minPoseConfidence) {
        const adjacentKeypoints = PoseNet.getAdjacentKeyPoints(keypoints, this.settings.posenet.minPartConfidence, context)

        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.drawSkeleton(adjacentKeypoints, context)
        this.drawKeypoints(keypoints, this.settings.posenet.minPartConfidence, context)
      }
    })
  }

  /**
   * Start tracking poses:
   * - If this.settings.autostart is false, then you can manually start it
   *    later with this
   * - A check is made internally so that only one process is ever running
   * [ ] Adds a `handsfree-is-started` to the body
   */
  start () {
    if (!this._isTracking) {
      if (this.settings.debug) this.settings.target.style.display = 'inherit'
      this._isTracking = true
      this.constructor.setupFeed.call(this)
      this.constructor.initPoseNet.call(this)
      this.constructor.trackPosesLoop(this)

      // Set body classes
      document.body.classList.remove('handsfree-is-stopped')
      document.body.classList.add('handsfree-is-started')

      this.startPlugins.call(this)
    }
  }

  /**
   * Stop tracking poses:
   * - A process can be stopped to free up memory for other expensive processes
   *    or to save on power when idling with this
   * [ ] Replaces `handsfree-is-started` with `handsfree-is-started`
   * [-] Runs plugin stops
   */
  stop () {
    if (this._isTracking) {
      this.settings.target.style.display = 'none'
      this._isTracking = false
      this.video.srcObject.getTracks().forEach(track => track.stop())

      // Set body classes
      document.body.classList.remove('handsfree-is-started')
      document.body.classList.add('handsfree-is-stopped')

      // Stop running plugins. Deferred to run after final frame
      this.stopPlugins()
    }
  }

  /**
   * Turns the webcam on if off and vice versa
   */
  toggle () {
    if (this._isTracking)
      this.stop()
    else
      this.start()
  }

  /**
   * Toggles all instances
   */
  toggleAll () {
    HandsfreeModuleInstances.forEach((instance) => {
      this.toggle.call(instance)
    })
  }

  /**
   * Updates this.settings with new ones
   * - Can update settings
   *
   * @param  {Object} opts The settings set to update
   */
  update (opts = {}) {
    if (this.settings) {
      let oldTarget = this.settings.target
      this.settings = merge(this.settings, opts)
      opts.target && this.updateTarget.call(this, opts.target, oldTarget)
    } else {
      this.constructor.setDefaults.call(this, opts)
      this.constructor.setAliases.call(this)
      this.constructor.setupGUI.call(this)
    }
  }

  /**
   * @TODO Our calculation entry point. If you'd like to run your own calculations
   * (either to make improvements or test with non-euclidean geometries) you can
   * overwrite this method (@FIXME let's provide an API for this).
   *
   * All you have to do is set: this.poses[index].lookingAt = {x, y}
   *
   * [-] Runs hacky calculations (for now)
   * [-] Emmits events
   */
  runCalculations () {
    // @SEE ./calculations/XY.js
    this.calculateXY()
    // @SEE ./calculations/Z.js
    this.calculateZ()
    this.emitEvents()
    this._isTracking && this.runPlugins()
  }
}

/**
 * That's it! You should have enough of an understanding to either fork the
 * project and make it yours or start picking off issues on GitHub:
 * https://github.com/LabOfOz/handsfree.js/issues
 *
 * Here are some more methods:
 */
require('./calculations/XY')(Handsfree)
require('./calculations/Z')(Handsfree)
require('./Mixins')(Handsfree)
require('./Helpers')(Handsfree)
require('./Plugin')(Handsfree)
require('./Settings')(Handsfree)

// Remember: to kick things off you'll want to instantiate this with `new`
module.exports = Handsfree
