/**
 * Setup.js
 *
 * A collection of additional, lower-priority methods.
 */
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
    const isMobile = this.constructor.isMobile()
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
}
