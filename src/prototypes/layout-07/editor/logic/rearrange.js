import { contentDirection } from "../../tome/TileData";

export const rearrangeSiblings = (pointerInfo, tileRects, saveState) => {
    const { tile, parent } = pointerInfo.current;

    // look at tile's parent direction for sibling rearrange
    const direction = parent.layout.direction;

    const tileOrder = parent.tiles.indexOf(tile);

    const tileMidX = pointerInfo.current.clientX;
    const tileMidY = pointerInfo.current.clientY;

    let increment = false;
    let decrement = false;

    parent.tiles.forEach(t => {
        if (t.id !== tile.id) {
            const tRect = tileRects.current.find(o => o.id === t.id).rect;
            const tMidY = tRect.top + tRect.height / 2;
            const tMidX = tRect.left + tRect.width / 2;
            const tOrder = parent.tiles.indexOf(t);

            if (direction === contentDirection.VERTICAL) {
                if (tileOrder > tOrder && tileMidY < tMidY) {
                    increment = t;
                }
                if (tileOrder < tOrder && tileMidY > tMidY) {
                    decrement = t;
                }
            }

            if (direction === contentDirection.HORIZONTAL) {
                if (tileOrder > tOrder && tileMidX < tMidX) {
                    increment = t;
                }

                if (tileOrder < tOrder && tileMidX > tMidX) {
                    decrement = t;
                }
            }

            if (direction === contentDirection.HORIZONTAL_WRAP) {
                increment = false;

            }


        }
    });

    if (increment) {
        const t = increment;
        const tOrder = parent.tiles.indexOf(t);
        parent.tiles.splice(tOrder, 1);
        parent.tiles.splice(tOrder + 1, 0, t);
        saveState();
    }

    if (decrement) {
        const t = decrement;
        const tOrder = parent.tiles.indexOf(t);
        parent.tiles.splice(tileOrder, 1);
        parent.tiles.splice(tOrder + 1, 0, tile);
        saveState();
    }
};