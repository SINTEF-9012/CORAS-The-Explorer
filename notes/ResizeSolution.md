# Resizing elements

## 1. Design

When the user `cell:pointerclick`s on a cell, we call `.highlight()` on the cell to show it has been selected.

This will also trigger an action, `CELL_CLICKED`, with location (`x`and `y` translated to page coordinates) as payload,
together with current element size. 

This action will change the state to open cell tools on the position of the cell.

We need this representation in state:

```json
{
    "open": true|false,
    "position": {
        "x": "<num>",
        "y": "<num>"
    },
    "size": {
        "width": "<num>",
        "height": "<num>"
    }
}
```

When `state.cellTool.open` is true, the cell tools will display on the cell. Initially we will add four handles in the edges of the
cell, which can be dragged to increase the cell size in either direction.

We will listen for a drag event on the edges, where we will get the new position of the edge, and calculate the new element size.
`state.cellTool.size` will update according to the actions that will be dispatched on drag, which in turn will influence the toolsize.
The element size will be updated in the drag event.

New size will be calculated as follows:

`currentX - state.cellTool.position.x = newWidth`
`currentY - state.cellTool.position.y = newHeight`

## 2. Tasks

- [X] Design cellTool with edges
- [X] Add event/action to show it
- [ ] Add event action to drag it
- [ ] Implement resizing
- [ ] Make it possible to close the cellTool
- [ ] Maybe add a "delete cell" button to the cellTool

## 3. Ideas

- Use a wrapper on the edges, position the wrapper `top: -.5rem; width: 100%;`, and then position the handle by `display: inline-block; text-align: center;`
