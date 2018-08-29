/**
 * Helpers.js
 *
 * A collection of helpers methods which may be helpful in your app outside
 * the context of Handsfree
 */
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
}
