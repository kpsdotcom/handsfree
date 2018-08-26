/**
 * Adds a control panel for updating settings live
 */
const control = require('control-panel')
let panel

module.exports = function (Handsfree) {
  Handsfree.prototype.use({
    name: 'ControlPanel',
    priority: 100,
    disabled: false,

    /**
     * Setup the control panel
     */
    onStart: () => {
    },

    onLoad: () => {
      panel = control([
        {label: 'Toggle', type: 'button'}
      ], {
        title: 'Handsfree.js',
        theme: 'light',
        position: 'top-right'
      })
    }
  })
}
