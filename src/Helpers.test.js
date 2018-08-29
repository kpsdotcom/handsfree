/**
 * Helpers.test.js
 */
const PoseNet = jest.mock('@tensorflow-models/posenet')
const STUBS = require('../mock/jest-polyfills')
const Handsfree = require('./Handsfree')
let handsfree = null

/**
 * Handsfree.setDefaults
 */
it('Sets defaults to the missing constructor settings', () => {
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()
  handsfree = new Handsfree()

  const $video = Handsfree.createDefaultVideo.call(handsfree, document.createElement('div'))
  expect($video.style.position).toBe('relative')
})

it('Creates a default (flipped) canvas and adds it to the DOM', () => {
  handsfree = new Handsfree()

  const $canvas = Handsfree.createDefaultCanvas.call(handsfree, document.createElement('div'))
  expect($canvas.style.position).toBe('absolute')
})

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

/**
 * Handsfree.drawKeypoints
 */
it('Draw each tracked keypoint', () => {
  handsfree = new Handsfree()

  const $canvas = document.createElement('canvas')
  const context = $canvas.getContext('2d')
  context.fill = jest.fn()

  Handsfree.drawKeypoints(STUBS.data.posenet.pose.single[0].keypoints, 0.9, context)
  expect(context.fill).toHaveBeenCalled()
})

/**
 * Handsfree.drawSkeleton
 */
it('Draw each tracked skeleton', () => {
  const drawSegment = Handsfree.drawSegment

  handsfree = new Handsfree()
  Handsfree.drawSegment = jest.fn()
  Handsfree.drawSkeleton(STUBS.data.posenet.adjacentPoints, document.createElement('canvas'))

  expect(Handsfree.drawSegment).toHaveBeenCalled()
  Handsfree.drawSegment = drawSegment
})

/**
 * Handsfree.drawSegment
 */
 it('Draws the skeleton segment', () => {
   handsfree = new Handsfree()

   const $canvas = document.createElement('canvas')
   const context = $canvas.getContext('2d')
   context.stroke = jest.fn()

   Handsfree.drawSegment([1, 2], [3, 4], context)
   expect(context.stroke).toHaveBeenCalled()
 })
