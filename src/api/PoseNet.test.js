/**
 * Setup.test.js
 */
const PoseNet = jest.mock('@tensorflow-models/posenet')
const STUBS = require('../../mock/jest-polyfills')
const Handsfree = require('../Handsfree')
let handsfree = null

STUBS.mediaDevices.support()
STUBS.WebGL.support()

/**
 * Handsfree.initPoseNet
 */
it('Initializes PoseNet and starts the tracking loop', async () => {
  PoseNet.load = () => true
  handsfree = new Handsfree()

  handsfree.posenet = false
  await Handsfree.initPoseNet.call(handsfree)
  expect(handsfree.posenet).toBeUndefined()

  handsfree.posenet = true
  await Handsfree.initPoseNet.call(handsfree)
  expect(typeof handsfree.posenet === 'boolean').toBeTruthy()
})

/**
 * Handsfree.trackPosesLoop
 */
it('This method is recursive, once called it continues until after !_isTracking', () => {
  handsfree = new Handsfree()
  handsfree.trackPoses = jest.fn(() => { return true })
  handsfree.runCalculations = jest.fn(() => { return true })
  handsfree.emitEvents = jest.fn()

  handsfree.posenet = {}
  handsfree.poses = STUBS.data.posenet.pose.single
  Handsfree.trackPosesLoop.call(Handsfree, handsfree)

  expect(handsfree.trackPoses).toHaveBeenCalled()
  expect(handsfree.runCalculations).toHaveBeenCalled()
  expect(handsfree.emitEvents).toHaveBeenCalled()
  handsfree.stop()
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

  handsfree.update({debug: true})
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

  Handsfree.drawSkeleton = jest.fn()
  Handsfree.drawKeypoints = jest.fn()

  handsfree.trackPoses(STUBS.data.posenet.pose.single)
  expect(Handsfree.drawSkeleton).toHaveBeenCalledTimes(1)
  expect(Handsfree.drawKeypoints).toHaveBeenCalledTimes(1)

  handsfree.settings.posenet.minPoseConfidence = 1
  handsfree.trackPoses(STUBS.data.posenet.pose.single)
  expect(Handsfree.drawSkeleton).toHaveBeenCalledTimes(1)
  expect(Handsfree.drawKeypoints).toHaveBeenCalledTimes(1)
})
