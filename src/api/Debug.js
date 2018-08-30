/**
 * Helpers.js
 *
 * A collection of helpers methods which may be helpful in your app outside
 * the context of Handsfree
 */
const merge = require('lodash/merge')

module.exports = function (Handsfree) {
  /**
   * Creates a default (flipped) video and adds it to the DOM:
   * - The video is absolutely positioned within the $wrap
   *
   * @param {HTMLElement} $wrap A container to embed the video into
   *
   * @return {HTMLVideoElement} A hidden video used for inference with PoseNet
   */
  Handsfree.createDefaultVideo = function ($wrap) {
    const $video = document.createElement('video')

    $wrap.classList.add('handsfree-debug-wrap')

    $video.setAttribute('playsinline', true)
    $video.style.transform = 'scale(-1, 1)'
    $video.style.position = 'relative'
    $video.style.width = '100%'
    $video.style.height = 'auto'
    $wrap.appendChild($video)

    return $video
  }

  /**
   * Creates a default (flipped) canvas and adds it to the DOM
   * - The canvas is added to the $wrap (along with the video) relatively
   *
   * @param {Element} $wrap The wrapping element to inject the canvas into
   *
   * @return {HTMLCanvasElement} A hidden canvas used for debugging with PoseNet
   */
  Handsfree.createDefaultCanvas = function ($wrap) {
    const $canvas = document.createElement('canvas')
    $canvas.style.transform = 'scale(-1, 1)'
    $canvas.style.position = 'absolute'
    $canvas.style.top = 0
    $canvas.style.left = 0
    $canvas.style.width = '100%'
    $canvas.style.height = '100%'

    $wrap.appendChild($canvas)

    return $canvas
  }

  /**
   * Draw each tracked keypoint
   * - Draws keypoints only when they are "visible"
   *
   * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
   *
   * @param {ARR} keypoints The list of all keypoints
   * @param {NUM} minConfidence The minimum keypoint score needed to track
   * @param {OBJ} context The canvas context to draw into
   */
  Handsfree.drawKeypoints = function (keypoints, minConfidence, context) {
    keypoints.forEach(({position, score}) => {
      if (score > minConfidence) {
        context.beginPath()
        context.arc(position.x, position.y, 15, 0, 2 * Math.PI)
        context.fillStyle = '#00ff00'
        context.fill()
      }
    })
  }

  /**
   * Draw each tracked skeleton
   * @see https://github.com/tensorflow/tfjs-models/tree/master/posenet
   *
   * - Draws all visible segments captured with PoseNet.getAdjacentKeyPoints
   *
   * @param {ARR} adjacentPoints The list of all keypoints and their relationships
   * @param {OBJ} context The canvas context to draw into
   */
  Handsfree.drawSkeleton = function (adjacentPoints, context) {
    adjacentPoints.forEach(keypoints => {
      Handsfree.drawSegment(Handsfree.toTuple(keypoints[0].position), Handsfree.toTuple(keypoints[1].position), context)
    })
  }

  /**
   * Potentially starts debuggers
   */
  Handsfree.maybeStartDebugging = function () {
    if (this._isTracking) {
      this.settings.debug.canvas.parent.style.display = this.settings.debug.canvas.show ? 'inherit' : 'none'
      this.gui.domElement.style.display = this.settings.debug.settings.show ? 'inherit' : 'none'
      this.performance.dom.style.display = this.settings.debug.stats.show ? 'inherit' : 'none'
    } else {
      Handsfree.stopDebugging.call(this)
    }
  }

  /**
   * Stops debugging
   */
  Handsfree.stopDebugging = function () {
    this.settings.debug.canvas.parent.style.display = 'none'
    this.gui.domElement.style.display = 'none'
    this.performance.dom.style.display = 'none'
  }

  /**
   * Transforms the debug setting into an object with defaults
   * @FIXME We need to refactor this
   *
   * @param {BOOLEAN|OBJECT} debug Whether to enable debug (true/false) or the debug config
   * @return {OBJECT} The defaults
   */
  Handsfree.debugSettingDefaults = function (opts) {
    let debugDefaults = {
      canvas: {
        show: false,
        parent: document.getElementById('handsfree-debug')
      },
      stats: {
        show: false,
        parent: document.body
      },
      settings: {
        show: false,
        parent: document.body
      }
    }

    // Setup default canvas parent
    if (!opts.debug || !opts.debug.canvas || typeof opts.debug.canvas !== 'object') {
      // Create the wrapping element
      if (!debugDefaults.canvas.parent) {
        debugDefaults.canvas.parent = document.createElement('p')
        debugDefaults.canvas.parent.id = 'handsfree-debug'
        debugDefaults.canvas.parent.style.position = 'relative'
        document.body.appendChild(debugDefaults.canvas.parent)
      }
      debugDefaults.canvas.parent.style.display = 'none'

      // Set the parent
      if (!opts.debug) opts.debug = {canvas: {show: false}}
      if (typeof opts.debug.canvas !== 'object')
        opts.debug.canvas = {show: opts.debug.canvas}
      opts.debug.canvas = merge(opts.debug.canvas, {parent: debugDefaults.canvas.parent})
    }

    // Set defaults
    if (typeof opts.debug === 'boolean' && opts.debug) {
      debugDefaults.canvas.show = true
      debugDefaults.stats.show = true
      debugDefaults.settings.show = true
    } else if (typeof opts.debug === 'object') {
      if (typeof opts.debug.canvas === 'boolean') opts.debug.canvas = {show: opts.debug.canvas}
      if (typeof opts.debug.stats === 'boolean') opts.debug.stats = {show: opts.debug.stats}
      if (typeof opts.debug.settings === 'boolean') opts.debug.settings = {show: opts.debug.settings}
      debugDefaults = merge(debugDefaults, opts.debug)
    }

    return debugDefaults
  }
}
