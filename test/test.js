var test = require('tape')
var GridStack = require('../')
var ObservGrid = require('observ-grid')

test('base', function(t){

  t.plan(6)

  var stack = GridStack()

  var removeListener = stack(function(grid){
    t.same(grid.data, [0,1,2,3,4,5])
  })

  var grid = ObservGrid([0,1,2,3,4,5], [2, 3])
  // 0 1 2
  // 3 4 5
  stack.push(grid)
  removeListener()

  t.equal(grid.get(0,1), 1)
  t.equal(grid.get(1,0), 3)
  t.equal(grid.get(1,2), 5)


  var removeListener = stack(function(grid){
    t.equal(grid.get(0,1), 'A')
    t.same(grid.data, [0,'A',2,3,4,5])
  })

  grid.set(0,1, 'A')
  removeListener()

  t.end()

})

test('stacked', function(t){
  t.plan(7)

  var grid1 = ObservGrid([0,1,2,3,4,5], [2, 3])
  // 0 1 2
  // 3 4 5

  var grid2 = ObservGrid([null,'A','B',null,'C','D'], [2, 3])
  // . A B
  // . C D

  var stack = GridStack([grid1, grid2])

  t.equal(stack.get(0,0), 0)
  t.equal(stack.get(1,0), 3)
  t.equal(stack.get(0,1), 'A')
  t.equal(stack.get(1,1), 'C')
  t.equal(stack.get(1,2), 'D')

  var removeListener = stack(function(value){
    t.same(value.data, [0,1,2,3,4,5])
  })

  t.equal(stack.pop(), grid2)
  removeListener()

  t.end()
})