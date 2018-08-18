/**
 * Plugin.js
 *
 * A collection of methods for handling plugins
 */
const merge = require('lodash/merge')
const forOwn = require('lodash/forOwn')

module.exports = function (Handsfree) {
  Handsfree.prototype.plugins = {}

  /**
   * Adds a plugin to the plugin queueu. The following prop
   * @param {Object}   config   The plugins config, in the form of
   * @prop  {String}   name     The plugin name
   * @prop  {Boolean}  disabled (false) Whether the plugin is disabled
   * @prop  {Integer}  priority (Handsfree.plugins.length) The order in which this plugin is called
   * @prop  {Function} callback The plugins logic, which is only run if disabled is false
   * @prop  {Function} onStop   Called when handsfree.stop()
   */
  Handsfree.prototype.use = function (config) {
    config = merge(config, {
      disabled: false,
      priority: Handsfree.prototype.plugins.length
    })

    // Catch missing properties
    try {
      if (typeof config.name === 'undefined') throw 'Plugin is missing a name'
      if (typeof config.callback === 'undefined') throw 'Plugin does not have a callback'
    } catch (err) {
      console.error('Handsfree Plugin Error: ' + err)
    }

    // Add the plugin to the queue
    Handsfree.prototype.plugins[config.name] = config
  }

  /**
   * Go through each plugin and run it callback
   */
  Handsfree.prototype.runPlugins = function () {
    forOwn(Handsfree.prototype.plugins, (config, name) => {
      this.poses && this.poses.forEach(pose => {
        if (!config.disabled) {
          config.callback.call(this, {
            x: pose.pointedAt.x,
            y: pose.pointedAt.y,
            pose: this.pose
          })
        }
      })
    })
  }

  /**
   * Go through each plugin and run it's stop method
   */
  Handsfree.prototype.stopPlugins = function () {
    forOwn(Handsfree.prototype.plugins, (config, name) => {
      config.onStop && config.onStop.call(this, {
        poses: this.poses
      })
    })
  }

  /**
   * Load built in plugins
   */
  require('./plugins/BasicPointer.js')(Handsfree)
}
