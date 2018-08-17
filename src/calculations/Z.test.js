/**
 * calculations/Z.test.js
 */
const STUBS = require('../../mock/jest-polyfills')
const SeeClarke = require('../SeeClarke')
let seeclarke = null

/**
 * SeeClarke.calculateZ
 */
test('Entry point for calculating the depth (distance away from camera)', () => {
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()

  seeclarke = new SeeClarke()
  seeclarke.poses = STUBS.data.posenet.pose.single
  seeclarke.constructor.setupFeed.call(seeclarke)
  seeclarke.poses[0].pointedAt = {}
  seeclarke.calculateZ()

  expect(typeof seeclarke.poses[0].pointedAt.z !== 'undefined').toBeTruthy()
  expect(seeclarke.poses[0].pointedAt.x || seeclarke.poses[0].pointedAt.y).toBeFalsy()
})
