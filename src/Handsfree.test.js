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

/**
 * constructor
 */
it('Fails if getUserMedia is not supported', () => {
  STUBS.mediaDevices.unsupport()
  try {handsfree = new Handsfree()} catch (e) {}
  expect(handsfree).toBeFalsy()

  // Set mediaDevices and try again
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()
  handsfree = new Handsfree()
  expect(handsfree).toBeTruthy()
})

it('Sanitizes settings and sets sane defaults', () => {
  handsfree = new Handsfree()
  expect(handsfree.settings.posenet).toBeTruthy()
})

it('Autostarts if settings.autostart', () => {
  handsfree = new Handsfree()
  expect(handsfree._isTracking).toEqual(false)

  handsfree = new Handsfree({autostart: true})
  expect(handsfree.settings.autostart).toEqual(true)
})

/**
 * Handsfree.start
 */
it('Starts tracking poses', () => {
  handsfree = new Handsfree({debug: true})
  document.body.classList =''

  Handsfree.setupFeed = jest.fn()
  Handsfree.initPoseNet = jest.fn()
  Handsfree.trackPosesLoop = jest.fn()

  expect(document.body.classList.contains('handsfree-is-started')).toBeFalsy()
  expect(document.body.classList.contains('handsfree-is-stopped')).toBeFalsy()
  handsfree.start()
  handsfree.start()
  handsfree.start()
  expect(Handsfree.trackPosesLoop).toHaveBeenCalledTimes(1)
  expect(document.body.classList.contains('handsfree-is-started')).toBeTruthy()
  expect(document.body.classList.contains('handsfree-is-stopped')).toBeFalsy()
})

/**
 * Handsfree.stop
 */
it('Stops tracking poses', () => {
  handsfree = new Handsfree()
  document.body.classList =''

  Handsfree.setupFeed = jest.fn()
  Handsfree.initPoseNet = jest.fn()
  Handsfree.trackPosesLoop = jest.fn()

  expect(document.body.classList.contains('handsfree-is-started')).toBeFalsy()
  expect(document.body.classList.contains('handsfree-is-stopped')).toBeFalsy()

  handsfree.stop()
  expect(handsfree._isTracking).toBeFalsy()
  handsfree._isTracking = true
  handsfree.stop()
  expect(handsfree._isTracking).toBeFalsy()

  expect(document.body.classList.contains('handsfree-is-started')).toBeFalsy()
  expect(document.body.classList.contains('handsfree-is-stopped')).toBeTruthy()
})

/**
 * Handsfree.update
 */
it('Can update settings', () => {
  handsfree = new Handsfree()

  handsfree.settings = null
  handsfree.update()
  expect(handsfree.settings).toBeTruthy()

  handsfree.update({debug: true})
  expect(handsfree.settings.debug).toBeTruthy()
})

/**
 * Handsfree.runCalculations
 */
it('Can run calculations and emmit events', () => {
  handsfree = new Handsfree()
  handsfree.calculateXY = jest.fn()
  handsfree.calculateZ = jest.fn()
  handsfree.emitEvents = jest.fn()

  handsfree._isTracking = true
  Handsfree.prototype.runPlugins = jest.fn()

  handsfree.runCalculations()
  expect(handsfree.calculateXY).toHaveBeenCalled()
  expect(handsfree.calculateZ).toHaveBeenCalled()
  expect(handsfree.emitEvents).toHaveBeenCalled()
  expect(Handsfree.prototype.runPlugins).toHaveBeenCalled()
})

/**
 * Handsfree.toggleAll
 */
it('Can toggle all instances', () => {
  handsfree = new Handsfree()
  handsfree.toggleAll()
  expect(handsfree._isTracking).toBeTruthy()
  handsfree.toggleAll()
  expect(handsfree._isTracking).toBeFalsy()
})
