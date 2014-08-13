var test = require('tape')
var GridStack = require('../')
var ObservGrid = require('observ-grid')

test('base', function(t){

  var stack = GridStack()

  var changes = []
  stack(function(grid){
    changes.push(grid)
  })

  var grid = ObservGrid([0,1,2,3,4,5], [2, 3])
  // 0 1 2
  // 3 4 5
  stack.push(grid)

  t.equal(grid.get(0,1), 1)
  t.equal(grid.get(1,0), 3)
  t.equal(grid.get(1,2), 5)

  t.equal(changes.length, 1)
  t.same(changes[0].data, [0,1,2,3,4,5])
  t.same(changes[0]._diff, [
    [ 0, 0, 0 ], [ 0, 1, 1 ], [ 0, 2, 2 ], [ 1, 0, 3 ], [ 1, 1, 4 ], [ 1, 2, 5 ]
  ])

  changes = []

  grid.set(0,1, 'A')

  t.equal(changes.length, 1)
  t.equal(changes[0].get(0,1), 'A')
  t.same(changes[0].data, [0,'A',2,3,4,5])
  t.same(changes[0]._diff, [ 
    [ 0, 1, 'A' ] 
  ])

  t.end()

})

test('stacked', function(t){

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

  var changes = []
  stack(function(value){
    changes.push(value)
  })

  t.equal(stack.pop(), grid2)

  t.equal(changes.length, 1)
  t.same(changes[0].data, [0,1,2,3,4,5])
  t.same(changes[0]._diff, [ 
    [ 0, 1, 1 ], [ 0, 2, 2 ], [ 1, 1, 4 ], [ 1, 2, 5 ] 
  ])

  t.end()
})