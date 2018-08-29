/**
 * Helpers.test.js
 */
const PoseNet = jest.mock('@tensorflow-models/posenet')
const STUBS = require('../mock/jest-polyfills')
const Handsfree = require('./Handsfree')
let handsfree = null

STUBS.mediaDevices.support()
STUBS.WebGL.support()

// Note that since we control the testing environment that we can safely assume
// the navigator.userAgent
it('Checks if we\'re on Mobile/Android/iOS', () => {
  handsfree = new Handsfree()
  expect(Handsfree.isAndroid()).toBe(false)
  expect(Handsfree.isiOS()).toBe(false)
  expect(Handsfree.isMobile()).toBe(false)
})

it('Checks if WebGL is supported', () => {
  handsfree = new Handsfree()
  const oldContext = HTMLCanvasElement.prototype.getContext

  STUBS.mediaDevices.support()
  STUBS.WebGL.support()
  expect(Handsfree.isWebGLSupported()).toBe(true)

  STUBS.mediaDevices.unsupport()
  STUBS.WebGL.unsupport()
  expect(Handsfree.isWebGLSupported('IGNORE THIS ERROR')).toBe(false)
})

/**
 * Handsfree.toTuple
 */
it('Converts a position to a tuple', () => {
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()

  handsfree = new Handsfree()

  expect(Handsfree.toTuple({x: 1, y: 2})).toEqual([2, 1])
})
