/**
 * 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
 * 🚨🚨🚨 DO NOT COMMIT CHANGES TO THIS FILE 🚨🚨🚨
 * 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
 *
 * 🐵 Instead, use this file while you develop the module.
 * Thanks!
 * -- Ozzy @labofoz
 */

// Demo setup
require('spectre.css')
require('../assets/style.styl')

// Let's make these global to make dev easier
window.HandsfreeModule = require('../src/Handsfree.js')
window.handsfree = new HandsfreeModule()
