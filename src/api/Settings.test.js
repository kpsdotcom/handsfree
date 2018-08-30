/**
 * # Settings.test.js
  # IMPORTANT TESTING NOTES
  =========================
  - Take care to properly test async methods with awaits, otherwise you may be
    doing edge-case things like checking the truthyness on a Promise object
  - [ ] @TODO We're not testing canvas elements yet. It's seems possible via e2e
  testing though, so we'll absolutely want to test that considering inference
  depends on that!
*/
const STUBS = require('../../mock/jest-polyfills')
const Handsfree = require('../Handsfree')
let handsfree = null

/**
 * Handsfree.setDefaults
 */
it('Sets defaults to the missing constructor settings', () => {
  STUBS.mediaDevices.support()
  STUBS.WebGL.support()
  handsfree = new Handsfree()

  Handsfree.setDefaults.call(handsfree)
  expect(handsfree.canvas && handsfree.video).toBeTruthy()

  const $wrap = document.createElement('div')
  $wrap.setAttribute('id', 'handsfree-debug')
  document.body.appendChild($wrap)
  handsfree.update({target: $wrap})

  Handsfree.setDefaults.call(handsfree)
  expect(handsfree.canvas && handsfree.video).toBeTruthy()
})

it('Uses custom target', () => {
  const div = document.createElement('div')
  handsfree = new Handsfree({target: div})
  expect(handsfree.settings.target).toBe(div)
})
