/**
 * Mixins.test.js
 */
const PoseNet = jest.mock('@tensorflow-models/posenet')
const STUBS = require('../mock/jest-polyfills')
const Handsfree = require('./Handsfree')
let handsfree = null

STUBS.mediaDevices.support()
STUBS.WebGL.support()

/**
 * Handsfree.setAliases
 */
it('Applies aliases to common settings. Feel free to add your own in here', () => {
  handsfree = new Handsfree()
  handsfree.settings.video = 1
  handsfree.settings.canvas = 2
  handsfree.settings.debug = 3

  Handsfree.setAliases.call(handsfree)
  expect(handsfree.video).toBe(handsfree.settings.video)
  expect(handsfree.canvas).toBe(handsfree.settings.canvas)
})

/**
 * Handsfree.setupFeed
 */
it('Sets up the webcam and stream', async () => {
  handsfree = new Handsfree()
  Handsfree.isMobile = jest.fn(() => true)

  handsfree.video.play = jest.fn()
  handsfree.video.srcObject = null
  await Handsfree.setupFeed.call(handsfree)

  expect(handsfree.video.play).toHaveBeenCalled()
  expect(handsfree.video.srcObject).toBeTruthy()
})

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
 * Handsfree.emitEvents
 */
it('Emits onHandsfreePoseUpdates with (this.poses, handsfree)', () => {
  let callback = jest.fn()
  window.addEventListener('onHandsfreePoseUpdates', callback)

  handsfree = new Handsfree()
  handsfree.emitEvents()
  expect(callback).toHaveBeenCalled()
})
