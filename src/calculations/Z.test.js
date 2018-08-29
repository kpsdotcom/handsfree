/**
 * calculations/Z.test.js
 */
const STUBS = require('../../mock/jest-polyfills')
const Handsfree = require('../Handsfree')
let handsfree = null

/**
 * Handsfree.calculateZ
 */
test('Entry point for calculating the depth (distance away from camera)', () => {
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()

  handsfree = new Handsfree()
  handsfree.poses = STUBS.data.posenet.pose.single
  Handsfree.setupFeed.call(handsfree)
  handsfree.poses[0].pointedAt = {}
  handsfree.calculateZ()

  expect(typeof handsfree.poses[0].pointedAt.z !== 'undefined').toBeTruthy()
  expect(handsfree.poses[0].pointedAt.x || handsfree.poses[0].pointedAt.y).toBeFalsy()
})
