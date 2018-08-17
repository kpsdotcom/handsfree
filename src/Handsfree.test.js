/**
 * # Handsfree.test.js
  # IMPORTANT TESTING NOTES
  =========================
  - Take care to properly test async methods with awaits, otherwise you may be
    doing edge-case things like checking the truthyness on a Promise object
  - [ ] @TODO We're not testing canvas elements yet. It's seems possible via e2e
  testing though, so we'll absolutely want to test that considering inference
  depends on that!
*/
const STUBS = require('../mock/jest-polyfills')
const Handsfree = require('./Handsfree')
let handsfree = null

/**
 * constructor
 */
it('Fails if getUserMedia is not supported', () => {
  STUBS.mediaDevices.unsupport()
  try {handsfree = new Handsfree()} catch (e) {}
  expect(handsfree).toBeFalsy()

  // Set mediaDevices and try again
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()
  handsfree = new Handsfree()
  expect(handsfree).toBeTruthy()
})

it('Sanitizes options and sets sane defaults', () => {
  handsfree = new Handsfree()
  expect(handsfree.options.posenet).toBeTruthy()
})

it('Autostarts if options.autostart', () => {
  handsfree = new Handsfree()
  expect(handsfree._isTracking).toEqual(false)

  handsfree = new Handsfree({autostart: true})
  expect(handsfree._isTracking).toEqual(true)
})

/**
 * Handsfree.trackPoses
 */
it('If debug is on, displays the points and skeletons overlays on the webcam', () => {
  handsfree = new Handsfree({debug: false})
  // Mock debugPoses; we're testing individual draw methods in other tests
  handsfree.debugPoses = jest.fn()
  handsfree.trackPoses([])
  expect(handsfree.debugPoses).not.toHaveBeenCalled()

  handsfree.debug = true
  handsfree.trackPoses([])
  expect(handsfree.debugPoses).toHaveBeenCalled()
})

it('Automatically adjusts algorithm to match "single" or "multiple mode"', () => {
  handsfree = new Handsfree({debug: true, posenet: {maxUsers: 1}})
  handsfree.debugPoses = jest.fn()
  handsfree.posenet = {
    estimateSinglePose: STUBS.posenet.estimateSinglePose,
    estimateMultiplePoses: STUBS.posenet.estimateMultiplePoses
  }
  handsfree.trackPoses()
  expect(handsfree.posenet.estimateSinglePose).toHaveBeenCalled()

  handsfree.update({posenet: {maxUsers: 2}})
  handsfree.trackPoses()
  expect(handsfree.posenet.estimateMultiplePoses).toHaveBeenCalled()
})

/**
 * Handsfree.debugPoses
 */
it('Draws skeletons and keypoints', () => {
  handsfree = new Handsfree({debug: true})

  handsfree.drawSkeleton = jest.fn()
  handsfree.drawKeypoints = jest.fn()

  handsfree.trackPoses(STUBS.data.posenet.pose.single)
  expect(handsfree.drawSkeleton).toHaveBeenCalledTimes(1)
  expect(handsfree.drawKeypoints).toHaveBeenCalledTimes(1)

  handsfree.options.posenet.minPoseConfidence = 1
  handsfree.trackPoses(STUBS.data.posenet.pose.single)
  expect(handsfree.drawSkeleton).toHaveBeenCalledTimes(1)
  expect(handsfree.drawKeypoints).toHaveBeenCalledTimes(1)
})

/**
 * Handsfree.start
 */
it('Starts tracking poses', () => {
  handsfree = new Handsfree({debug: true})
  document.body.classList =''

  handsfree.constructor.setupFeed = jest.fn()
  handsfree.constructor.initPoseNet = jest.fn()
  handsfree.constructor.trackPosesLoop = jest.fn()

  expect(document.body.classList.contains('handsfree-is-started')).toBeFalsy()
  expect(document.body.classList.contains('handsfree-is-stopped')).toBeFalsy()
  handsfree.start()
  handsfree.start()
  handsfree.start()
  expect(handsfree.constructor.trackPosesLoop).toHaveBeenCalledTimes(1)
  expect(document.body.classList.contains('handsfree-is-started')).toBeTruthy()
  expect(document.body.classList.contains('handsfree-is-stopped')).toBeFalsy()
})

/**
 * Handsfree.stop
 */
it('Stops tracking poses', () => {
  handsfree = new Handsfree()
  document.body.classList =''

  handsfree.constructor.setupFeed = jest.fn()
  handsfree.constructor.initPoseNet = jest.fn()
  handsfree.constructor.trackPosesLoop = jest.fn()

  expect(document.body.classList.contains('handsfree-is-started')).toBeFalsy()
  expect(document.body.classList.contains('handsfree-is-stopped')).toBeFalsy()

  handsfree.stop()
  expect(handsfree._isTracking).toBeFalsy()
  handsfree._isTracking = true
  handsfree.stop()
  expect(handsfree._isTracking).toBeFalsy()

  expect(document.body.classList.contains('handsfree-is-started')).toBeFalsy()
  expect(document.body.classList.contains('handsfree-is-stopped')).toBeTruthy()
})

/**
 * Handsfree.update
 */
it('Can update settings', () => {
  handsfree = new Handsfree()

  handsfree.options = null
  handsfree.update()
  expect(handsfree.options).toBeTruthy()

  handsfree.update({debug: true})
  expect(handsfree.debug).toBeTruthy()
})

/**
 * Handsfree.runCalculations
 */
it('Can run calculations and emmit events', () => {
  handsfree = new Handsfree()
  handsfree.calculateXY = jest.fn()
  handsfree.calculateZ = jest.fn()
  handsfree.emitEvents = jest.fn()

  handsfree.runCalculations()
  expect(handsfree.calculateXY).toHaveBeenCalled()
  expect(handsfree.calculateZ).toHaveBeenCalled()
  expect(handsfree.emitEvents).toHaveBeenCalled()
})
