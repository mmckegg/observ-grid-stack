var ArrayGrid = require('array-grid')
var ObservArray = require('observ-array')
var Observ = require('observ')

module.exports = GridStack

function GridStack(startStack){
  var self = Observ()

  var set = self.set
  var lastArray = []

  self.stack = ObservArray(startStack || [])
  if (startStack){
    refresh()
  }

  var releases = [
    self.stack(refresh)
  ]

  self.push = function(grid){
    self.stack.push(grid)
    return function remove(){
      self.stack.splice(self.stack.indexOf(grid), 1)
    }
  }

  self.pop = function(){
    return self.stack.pop()
  }

  self.get = function(row, col){
    if (self()){
      return self().get(row, col)
    }
  }

  self.index = function(row, col){
    if (self()){
      return self().index(row, col)
    }
  }

  self.lookup = function(value){
    if (self()){
      return self().lookup(value)
    }
  }

  self.coordsAt = function(row, col){
    if (self()){
      return self().coordsAt(value)
    }
  }

  // don't allow setting from outside
  self.set = null

  return self

  // scoped

  function refresh(){
    var value = flatten(self.stack(), lastArray)
    lastArray = value.data
    set(value)
  }

}

function flatten(stack, lastArray){
  if (Array.isArray(stack) && stack.length){
    var top = stack[stack.length-1]

    var array = []
    lastArray = lastArray || []


    stack.forEach(function(grid){
      grid.data.forEach(function(value, i){
        if (value != null){
          array[i] = value
        }
      })
    })

    var result = ArrayGrid(array, top.shape, top.stride)

    // generate diff
    var changes = []
    var length = Math.max(lastArray.length, array.length)
    for (var i=0;i<length;i++){
      if (array[i] !== lastArray[i]){
        var coords = top.coordsAt(i)
        changes.push([coords[0], coords[1], array[i]])
      }
    }

    result._diff = changes
    return result
  }
}