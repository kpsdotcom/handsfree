/**
 * Plugin.js
 *
 * A collection of methods for handling plugins
 */
const merge = require('lodash/merge')
const forOwn = require('lodash/forOwn')
const once = require('lodash/once')

module.exports = function (Handsfree) {
  Handsfree.prototype.plugins = {}

  /**
   * Adds a plugin to the plugin queueu. The following prop
   * - Also resorts plugins based on priority
   *
   * @param {Object}   config   The plugins config, in the form of
   * @prop  {String}   name     The plugin name
   * @prop  {Boolean}  disabled (false) Whether the plugin is disabled
   * @prop  {Integer}  priority (Handsfree.plugins.length) The order in which this plugin is called
   * @prop  {Function} callback The plugins logic, which is only run if disabled is false
   * @prop  {Function} onStop   Called when handsfree.stop()
   */
  Handsfree.prototype.use = function (config) {
    config = merge({
      disabled: false,
      priority: Object.keys(Handsfree.prototype.plugins).length
    }, config)

    // Make sure onInit is ever called only once
    if (config.onInit) config.onInit = once(config.onInit)

    // Catch missing properties
    try {
      if (typeof config.name === 'undefined') throw 'Plugin is missing a name'
    } catch (err) {
      console.error(`Handsfree Plugin Error [${config.name}.js]: ` + err)
      return
    }

    // Add the plugin to the queue
    Handsfree.prototype.plugins[config.name] = config

    // Sort plugins by priority
    Handsfree.prototype.sortPluginsByPriority()
  }

  /**
   * Go through each plugin and run it callback
   */
  Handsfree.prototype.runPlugins = function () {
    this.sortedPlugins.forEach(name => {
      const plugin = this.plugins[name]

      this.poses && this.poses.forEach(pose => {
        if (!plugin.disabled) {
          plugin.callback && plugin.callback.call(this, {
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
   * Start plugins
   */
  Handsfree.prototype.startPlugins = function () {
    forOwn(Handsfree.prototype.plugins, (config, name) => {
      if (!config.disabled) {
        config.onInit && config.onInit.call(this)
        config.onStart && setTimeout(() => {config.onStart.call(this)})
      }
    })
  }

  /**
   * Sorts plugins by priority
   */
  Handsfree.prototype.sortPluginsByPriority = function () {
    let plugins = Object.keys(this.plugins)

    plugins.sort((a, b) => {
      let priorityA = this.plugins[a].priority
      let priorityB = this.plugins[b].priority

      if (priorityA < priorityB) return -1
      if (priorityA > priorityB) return 1
      return 0
    })

    Handsfree.prototype.sortedPlugins = plugins
  }

  /**
   * Load built in plugins
   */
  require('./plugins/BasicPointer.js')(Handsfree)
}
