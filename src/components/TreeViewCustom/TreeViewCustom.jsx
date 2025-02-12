import React, { useState, useMemo } from 'react';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import { FixedSizeList as List } from 'react-window';

const TreeViewCustom = ({ items, selectedItems, multiSelect }) => {
  const [itemsSelected, setItemsSelected] = useState(new Set(selectedItems));

  const handleSelection = (idx) => {
    const newSelection = new Set(itemsSelected);
    if (newSelection.has(idx)) newSelection.delete(idx);
    else newSelection.add(idx);
    setItemsSelected(newSelection);
  };

  const selectAll = () => {
    setItemsSelected(new Set(items.map((_, idx) => idx))); // Add all indices to the selected set
  };

  const deselectAll = () => {
    setItemsSelected(new Set()); // Clear all selections
  };

  const renderedItems = useMemo(
    () =>
      items.map((item, idx) => {
        const isChecked = itemsSelected.has(idx);
        return (
          <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>
            {isChecked ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            <FormControlLabel
              control={
                <Checkbox
                  checked={isChecked}
                  onChange={() => handleSelection(idx)}
                />
              }
              label={`Label ${idx}`}
            />
          </Box>
        );
      }),
    [items, itemsSelected]
  );

  // Virtualized List Component
  const Row = ({ index, style }) => {
    return <div style={style}>{renderedItems[index]}</div>;
  };

  return (
    <FormGroup>
      <Box sx={{ mb: 2 }}>
        {/* Add buttons for Select All and Deselect All */}
        <Button
          variant='contained'
          color='primary'
          onClick={selectAll}
          sx={{ mr: 1 }}
        >
          Select All
        </Button>
        <Button variant='contained' color='secondary' onClick={deselectAll}>
          Deselect All
        </Button>
      </Box>
      <List
        height={400} // Adjust for the viewport height
        itemCount={items.length}
        itemSize={40} // Height of each row in pixels
        width='100%'
      >
        {Row}
      </List>
    </FormGroup>
  );
};

export default TreeViewCustom;
