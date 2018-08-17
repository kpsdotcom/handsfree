/**
 * calculations/XY.test.js
 */
const STUBS = require('../../mock/jest-polyfills')
const Handsfree = require('../Handsfree')
let handsfree = null

/**
 * Handsfree.setDefaults
 * @FIXME Needs refactoring
 */
test('Entry point for our hacky calculations', () => {
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()

  // Test when the left eye is closer
  handsfree = new Handsfree()
  handsfree.poses = STUBS.data.posenet.pose.single
  handsfree.constructor.setupFeed.call(handsfree)
  handsfree.calculateXY()

  expect(handsfree.poses[0].pointedAt.x && handsfree.poses[0].pointedAt.y).toBeTruthy()
  expect(handsfree.poseStack.length).toBeTruthy()

  // Run through the other conditionals (if the above passes then so will these)
  handsfree.options.posenet.minPartConfidence = 10
  handsfree.calculateXY()

  handsfree.poses[0].keypoints[1].position.x += 5000
  handsfree.options.poseStackSize = 0
  handsfree.calculateXY()

  expect(handsfree.poses[0].pointedAt.z).toBeFalsy()
})
