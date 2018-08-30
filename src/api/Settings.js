/**
 * Settings.js
 *
 * A collection of methods for handling settings and it's control panel
 */
const merge = require('lodash/merge')
const dat = require('dat.gui')

module.exports = function (Handsfree) {
  /**
   * Sets defaults to the missing constructor settings:
   * - Sets defaults
   * - Creates a default debug container
   * - Creates a default video and canvas
   *
   * @param {Object} opts The settings passed into the constructor. Pass null to use all defaults
   */
  Handsfree.setDefaults = function (opts = {}) {
    // Setup complex defaults
    opts.debug = Handsfree.debugSettingDefaults(opts)

    // Setup the video element
    const video = opts.video || Handsfree.createDefaultVideo(opts.debug.canvas.parent)
    this.initsettings = opts

    // Setup defaults
    this.settings = merge({
      autostart: false,
      canvas: Handsfree.createDefaultCanvas(opts.debug.canvas.parent),
      debug: false,
      facingMode: 'user',
      poseStackSize: 8,
      posenet: {
        multiplier: 0.75,
        maxUsers: 1,
        imageScaleFactor: 0.4,
        minPoseConfidence: 0.1,
        minPartConfidence: 0.5,
        outputStride: 16,
        nmsRadius: 20,
        scoreThreshold: 0.5
      },
      video
    }, opts)

    // Chache
    this.cache = {
      window: {
        // @SEE this.setupFeed
        area: 0
      }
    }
  }

  /**
   * Setup the GUI, with a panel for PoseNet
   */
  Handsfree.setupGUI = function () {
    this.gui = new dat.GUI()
    const folder = this.gui.addFolder('PoseNet')

    folder.add(this.settings.posenet, 'imageScaleFactor', 0.2, 1.0)
    folder.add(this.settings.posenet, 'maxUsers', 1, 24)
    folder.add(this.settings.posenet, 'minPartConfidence', 0.1, 1.0)
    folder.add(this.settings.posenet, 'minPoseConfidence', 0.1, 1.0)
    folder.add(this.settings.posenet, 'nmsRadius', 10, 100)

    this.gui.domElement.style.display = 'none'
  }
}
