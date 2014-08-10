var ArrayGrid = require('array-grid')
var ObservArray = require('observ-array')
var Observ = require('observ')

module.exports = GridStack

function GridStack(startStack){
  var self = Observ()

  var set = self.set

  self.stack = ObservArray(startStack || [])
  if (startStack){
    set(flatten(self.stack()))
  }

  var releases = [
    self.stack(function(value){
      set(flatten(value))
    })
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

}

function flatten(stack){
  if (Array.isArray(stack) && stack.length){
    var top = stack[stack.length-1]
    var array = []

    stack.forEach(function(grid){
      grid.data.forEach(function(value, i){
        if (value != null){
          array[i] = value
        }
      })
    })

    return ArrayGrid(array, top.shape, top.stride)
  }
}