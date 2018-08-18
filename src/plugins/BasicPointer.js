/**
 * Creates a basic pointer for each tracked pose
 */

module.exports = function (Handsfree) {
  Handsfree.prototype.use({
    name: 'BasicPointer',
    priority: 0,
    disabled: false,
    callback: ({x, y}) => {
      console.log(x, y)
    }
  })
}
