/**
 * Handsfree.js
 *
 * This file contains all the "onboarding methods"; a glance at these methods
 * should give you a general understanding for how the app works!
 */
require('./polyfills')
const merge = require('lodash/merge')
const forEach = require('lodash/forEach')
const PoseNet = require('@tensorflow-models/posenet')
const Stats = require('stats.js')
let HandsfreeModuleInstances = []
window.HandsfreeModuleInstances = HandsfreeModuleInstances

class Handsfree {
  /**
   * 🏆 Our main constructor
   * - Fails if getUserMedia is not supported
   * - Sanitizes settings and sets sane defaults
   * - Autostarts if settings.autostart
   *
   * @param {Object} [opts={}] Constructor settings, @see /wiki/settings.md
   */
  constructor (opts = {}) {
    /**
     * Cache this instance
     * - Accessible with window.HandsfreeModuleInstances
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
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !Handsfree.isWebGLSupported()) {
      throw new Error('ERROR: This browser does not support webcams, please try another browser...like Google Chrome!')
    } else {
      // We know the browser has full support now
      this._isSupported = true

      // "Sanitize" constructor input
      this.update(opts)

      // Run plugin onLoads
      forEach(this.plugins, (config) => {
        !config.disabled && config.onLoad && config.onLoad.call(this)
      })

      // Setup performance monitoring
      this.performance = new Stats()
      this.settings.debug.stats.parent.appendChild(this.performance.dom)
      this.performance.dom.style.display = 'none'
      this.performance.dom.classList.add('handsfree-performance')

      // Possibly autostart after plugins have been loaded
      this.settings.autostart && setTimeout(() => {this.start()})
    }
  }

  /**
   * Start tracking poses:
   * - If this.settings.autostart is false, then you can manually start it
   *    later with this
   * - A check is made internally so that only one process is ever running
   * - Adds a `handsfree-is-started` to the body
   */
  start () {
    if (!this._isTracking && this.settings) {
      this._isTracking = true
      Handsfree.setupFeed.call(this)
      Handsfree.initPoseNet.call(this)
      Handsfree.trackPosesLoop(this)

      // Set body classes
      document.body.classList.remove('handsfree-is-stopped')
      document.body.classList.add('handsfree-is-started')

      this.startPlugins.call(this)
      Handsfree.maybeStartDebugging.call(this)
      window.dispatchEvent(new Event('resize'))
    }
  }

  /**
   * Stop tracking poses:
   * - A process can be stopped to free up memory for other expensive processes
   *    or to save on power when idling with this
   * - Replaces `handsfree-is-started` with `handsfree-is-started`
   * - Runs plugin stops
   */
  stop () {
    if (this._isTracking) {
      this.settings.debug.canvas.parent.style.display = 'none'
      this._isTracking = false
      this.video.srcObject.getTracks().forEach(track => track.stop())

      // Set body classes
      document.body.classList.remove('handsfree-is-started')
      document.body.classList.add('handsfree-is-stopped')

      // Stop running plugins. Deferred to run after final frame
      this.stopPlugins()
      Handsfree.stopDebugging.call(this)
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
   * - Stops and starts to refresh settings
   *
   * @param  {Object} opts The settings set to update
   */
  update (opts = {}) {
    if (this.settings) {
      this.settings = merge(this.settings, opts)

      // Update debug mode
      if (typeof opts.debug !== 'undefined')
        this.settings.debug = Handsfree.debugSettingDefaults(this.settings)
      Handsfree.maybeStartDebugging.call(this)
    } else {
      Handsfree.setDefaults.call(this, opts)
      Handsfree.setAliases.call(this)
      Handsfree.setupGUI.call(this)
    }
  }

  /**
   * Emits events
   * - Emits onHandsfreePoseUpdates with (this.poses, handsfree)
   */
  emitEvents () {
    window.dispatchEvent(new CustomEvent('onHandsfreePoseUpdates', {
      detail: {
        context: this
      }
    }))
  }
}

/**
 * That's it! You should have enough of an understanding to either fork the
 * project and make it yours or start picking off issues on GitHub:
 * https://github.com/LabOfOz/handsfree.js/issues
 *
 * Here are some more methods:
 */
require('./Setup')(Handsfree)
require('./Helpers')(Handsfree)
require('./api/Debug')(Handsfree)
require('./api/Plugin')(Handsfree)
require('./api/Settings')(Handsfree)
require('./api/PoseNet')(Handsfree)
require('./api/Calculations')(Handsfree)

// Remember: to kick things off you'll want to instantiate this with `new`
module.exports = Handsfree
