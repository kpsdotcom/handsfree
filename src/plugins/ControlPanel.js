/**
 * Adds a control panel for updating settings live
 */
const panel = require('control-panel')

module.exports = function (Handsfree) {
  Handsfree.prototype.use({
    name: 'ControlPanel',
    priority: 100,
    disabled: false,

    /**
     * Setup the control panel
     */
    onStart: () => {
      console.log('yo');
    }
  })
}
