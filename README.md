observ-grid-stack
===

Observe stacked [array-grids](https://github.com/mmckegg/array-grid) (or [observ-grid](https://github.com/mmckegg/observ-grid)) of identical shape, falling back to grid below on coordinate value null.

## Install via [npm](https://npmjs.org/package/observ-grid-stack)

```bash
$ npm install observ-grid-stack
```

## API

```js
var ObservGridStack = require('observ-grid-stack')
```

### `var gridStack = ObservGridStack([startStack])`

Create an observable grid stack. Optionally specify an array of [array-grids](https://github.com/mmckegg/array-grid) (or [observ-grid](https://github.com/mmckegg/observ-grid)) as `startStack`.

### `var remove = gridStack.push(grid)`

Push an array-grid onto the stack. Non-null coordinate values will override the value directly below in the stack.

### `var removedGrid = gridStack.pop()`

### `gridStack.get(row, col)`

Resolve coordinates against flattened stack.

### `gridStack.index(row, col)`

### `gridStack.lookup(row, col)`

### `gridStack.coordsAt(row, col)`

## Observable Attributes

### `gridStack`

Returns an array-grid based on flattened stack. Notifies on all changes to stack on **nextTick**.

### `gridStack.stack` ([ObservArray](https://github.com/raynos/observ-array))

Modify directly or use `gridStack.push(grid)` and `gridStack.pop()`.