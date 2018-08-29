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
