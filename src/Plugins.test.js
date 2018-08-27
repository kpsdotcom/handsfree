/**
 * # Handsfree.test.js
  # IMPORTANT TESTING NOTES
  =========================
  - Take care to properly test async methods with awaits, otherwise you may be
    doing edge-case things like checking the truthyness on a Promise object
  - [ ] @TODO We're not testing canvas elements yet. It's seems possible via e2e
  testing though, so we'll absolutely want to test that considering inference
  depends on that!
*/
const STUBS = require('../mock/jest-polyfills')
const Handsfree = require('./Handsfree')
let handsfree = null

STUBS.mediaDevices.support()
STUBS.WebGL.support()

/**
 * Handsfree.runPlugins
 */
it('Run plugins', () => {
  handsfree = new Handsfree()
  handsfree.poses = STUBS.data.posenet.pose.single
  Handsfree.prototype.plugins.BasicPointer.callback = jest.fn()
  handsfree.start()
  expect(Handsfree.prototype.plugins.BasicPointer.callback).toHaveBeenCalled()
})
