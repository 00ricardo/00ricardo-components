import React, { useState, useRef, useEffect, useCallback } from 'react';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import Box from '@mui/material/Box';
const DEFAULT_ROW_HEIGHT = 30;
// ! VirtualizedTreeView is was created upon "react-window" and "react-virtualized-auto-sizer"
// ! RichTreeView from MUI doesn't support virtualization meaning that, for big lists, a lot of DOM elements
// ! had been created which caused a lot of performance issues (the whole component is rendered)
// ! Virtual lists improves performance since, only "visible" nodes are rendered into the DOM
const VirtualizedTreeView = ({ items }) => {
  // ! State to keep track of expanded items in the tree view
  const [expandedItems, setExpandedItems] = useState([]);
  // ! Creating a reference to access the List component (used for manipulating the virtual list)
  const listRef = useRef();
  // ! Reference to keep track of individual row heights in the list
  // ! This reference is important becaue we will be updating the heigh according to expanded nodes
  const rowHeights = useRef({});

  // ! Handle changes in expanded items (when a user expands or collapses a tree node)
  const handleExpandedItemsChange = (event, itemIds) => {
    setExpandedItems(itemIds);
  };

  // ! This function returns the size (height) of an individual row based on the index
  const getItemSize = (index) =>
    rowHeights.current[index] || DEFAULT_ROW_HEIGHT;

  // ! This function updates the row height for a specific row at the given index
  const updateRowHeight = (index, size) => {
    rowHeights.current[index] = size;
    listRef.current?.resetAfterIndex(index); // Re-render from index
  };

  // ! Function to calculate the total height of a node, including expanded child nodes
  // ! The function only runs for "visible" nodes
  const calculateHeight = (index) => {
    const item = items[index];

    // ! If the item is expanded, calculate additional height for child nodes
    if (expandedItems.includes(item.id) && item.children) {
      item.children.forEach((child, childIndex) => {
        height += DEFAULT_ROW_HEIGHT; // Recursive call for child items
      });
    }

    return height;
  };

  // ! The Row component is responsible for rendering each row (tree node)
  const Row = ({ index, style }) => {
    const ref = useCallback(
      (node) => {
        if (node) {
          const height = calculateHeight(index); //! Recalculate height based on expanded state
          if (height !== rowHeights.current[index]) {
            updateRowHeight(index, height);
          }
        }
      },
      [index, expandedItems] //! Update when expandedItems change
    );

    return (
      <div style={{ ...style, padding: 4 }} ref={ref}>
        <RichTreeView
          items={[items[index]]}
          multiSelect
          checkboxSelection
          expandedItems={expandedItems}
          onExpandedItemsChange={handleExpandedItemsChange}
        />
      </div>
    );
  };
  // ! re-render the list from index 0 whenever expandedItems changes
  useEffect(() => {
    // ! Force recalculation of heights whenever expandedItems change
    listRef.current?.resetAfterIndex(0); // ! Start recalculation from the top
  }, [expandedItems]);

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef} //! Attach the reference to the list so we can call its methods later
            height={height} //! Set the height of the list
            itemCount={items.length} //! Set the total number of items (rows) in the list
            itemSize={getItemSize} //! Provide the function to determine each row's height
            width={width} //! Set the width of the list
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </Box>
  );
};

export default VirtualizedTreeView;
