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
it('Can run plugins', (done) => {
  handsfree = new Handsfree()
  handsfree.poses = STUBS.data.posenet.pose.single
  Handsfree.prototype.plugins.BasicPointer.callback = jest.fn()
  handsfree.start()
  setTimeout(() => {
    expect(Handsfree.prototype.plugins.BasicPointer.callback).toHaveBeenCalled()
    done()
  })
})

/**
 * Handsfree.startPlugins
 */
it('Can start plugins and run onStart', (done) => {
  handsfree = new Handsfree()
  handsfree.poses = STUBS.data.posenet.pose.single
  Handsfree.prototype.plugins.BasicPointer.onStart = jest.fn()
  handsfree.start()

  setTimeout(() => {
    expect(Handsfree.prototype.plugins.BasicPointer.onStart).toHaveBeenCalled()
    done()
  })
})

/**
 * Handsfree.use
 */
it('Cannot create nameless plugins', () => {
  handsfree = new Handsfree()
  let oldPluginCount = Handsfree.prototype.plugins.length
  let newPluginCount

  // We're purposefully failing, so lets disable that in test console
  let oldConsoleErr = console.error
  console.error = jest.fn()

  handsfree.use({})
  newPluginCount = Handsfree.prototype.plugins.length
  expect(oldPluginCount).toEqual(newPluginCount)

  // Re-enable console.error
  console.error = oldConsoleErr
})

it('Can run plugin onLoad', (done) => {
  let config = {
    name: 'testPlugin',
    onLoad: jest.fn()
  }
  Handsfree.prototype.use(config)
  handsfree = new Handsfree()

  window.HandsfreeModuleInstances = [handsfree]
  setTimeout(() => {
    expect(config.onLoad).toHaveBeenCalled()
    done()
  })
})

it('Can run plugin onInit', (done) => {
  handsfree = new Handsfree()
  let config = {
    name: 'testPlugin',
    onInit: jest.fn()
  }

  handsfree.use(config)
  setTimeout(() => {
    expect(config.onInit).toEqual(expect.any(Function))
    done()
  })
})

it('Cannot run disabled plugins', () => {
  handsfree = new Handsfree()
  handsfree.poses = STUBS.data.posenet.pose.single
  Handsfree.prototype.plugins.BasicPointer.callback = jest.fn()
  Handsfree.prototype.plugins.BasicPointer.disabled = true
  handsfree.start()
  expect(Handsfree.prototype.plugins.BasicPointer.callback).not.toHaveBeenCalled()
})
