/**
 * Helpers.test.js
 */
const STUBS = require('../../mock/jest-polyfills')
const Handsfree = require('../Handsfree')
let handsfree = null

STUBS.mediaDevices.support()
STUBS.WebGL.support()

/**
 * Handsfree.setDefaults
 */
it('Sets defaults to the missing constructor settings', () => {
  handsfree = new Handsfree()

  const $video = Handsfree.createDefaultVideo.call(handsfree, document.createElement('div'))
  expect($video.style.position).toBe('relative')
})

it('Creates a default (flipped) canvas and adds it to the DOM', () => {
  handsfree = new Handsfree()

  const $canvas = Handsfree.createDefaultCanvas.call(handsfree, document.createElement('div'))
  expect($canvas.style.position).toBe('absolute')
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
