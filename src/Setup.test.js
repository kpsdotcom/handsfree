/**
 * Setup.test.js
 */
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
 * Handsfree.emitEvents
 */
it('Emits onHandsfreePoseUpdates with (this.poses, handsfree)', () => {
  let callback = jest.fn()
  window.addEventListener('onHandsfreePoseUpdates', callback)

  handsfree = new Handsfree()
  handsfree.emitEvents()
  expect(callback).toHaveBeenCalled()
})
