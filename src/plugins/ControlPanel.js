/**
 * Adds a control panel for updating settings live
 */
const control = require('control-panel')
let panel

module.exports = function (Handsfree) {
  /**
   * Create the plugin
   */
  Handsfree.prototype.use({
    name: 'ControlPanel',
    priority: 100,
    disabled: false,

    /**
     * Setup the panel
     */
    onLoad: function () {
      panel = control([
        {label: 'Toggle', type: 'button', action () { Handsfree.prototype.toggleAll() }}
      ], {
        title: 'Handsfree.js',
        theme: 'light',
        position: 'top-right'
      })
    }
  })
}
