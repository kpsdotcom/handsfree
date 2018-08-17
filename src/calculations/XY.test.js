/**
 * calculations/XY.test.js
 */
const STUBS = require('../../mock/jest-polyfills')
const SeeClarke = require('../SeeClarke')
let seeclarke = null

/**
 * SeeClarke.setDefaults
 * @FIXME Needs refactoring
 */
test('Entry point for our hacky calculations', () => {
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()

  // Test when the left eye is closer
  seeclarke = new SeeClarke()
  seeclarke.poses = STUBS.data.posenet.pose.single
  seeclarke.constructor.setupFeed.call(seeclarke)
  seeclarke.calculateXY()

  expect(seeclarke.poses[0].pointedAt.x && seeclarke.poses[0].pointedAt.y).toBeTruthy()
  expect(seeclarke.poseStack.length).toBeTruthy()

  // Run through the other conditionals (if the above passes then so will these)
  seeclarke.options.posenet.minPartConfidence = 10
  seeclarke.calculateXY()

  seeclarke.poses[0].keypoints[1].position.x += 5000
  seeclarke.options.poseStackSize = 0
  seeclarke.calculateXY()

  expect(seeclarke.poses[0].pointedAt.z).toBeFalsy()
})
