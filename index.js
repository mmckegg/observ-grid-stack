var ArrayGrid = require('array-grid')
var ObservArray = require('observ-array')
var computedNextTick = require('./computed-next-tick')

module.exports = GridStack

function GridStack(startStack){

  var stack = ObservArray([])
  var fallbackTop = {shape: [1,1], stride: [1,1]}

  var self = computedNextTick([stack], function(stack){
    var top = stack[stack.length-1] || fallbackTop
    var data = stack.reduce(function(result, grid){
      grid.data.forEach(function(value, i){
        if (value != null){
          result[i] = value
        }
      })
      return result
    }, [])
    return ArrayGrid(data, top.shape, top.stride)
  })

  stack.set(startStack || [])

  self.stack = stack

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
    self.update()
    if (self()){
      return self().get(row, col)
    }
  }

  self.index = function(row, col){
    self.update()
    if (self()){
      return self().index(row, col)
    }
  }

  self.lookup = function(value){
    self.update()
    if (self()){
      return self().lookup(value)
    }
  }

  self.coordsAt = function(row, col){
    self.update()
    if (self()){
      return self().coordsAt(value)
    }
  }

  return self
}