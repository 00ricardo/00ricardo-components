import { useEffect, useState } from 'react';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import BlurCircularIcon from '@mui/icons-material/BlurCircular';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TextField from '@mui/material/TextField';
import rutils from '00ricardo-utils';
const MUI_X_PRODUCTS = [
  {
    id: 'R1111',
    label: 'R1111',
    children: [
      { id: 'grid-community', label: '@mui/x-data-grid' },
      { id: 'grid-pro', label: '@mui/x-data-grid-pro' },
      { id: 'grid-premium', label: '@mui/x-data-grid-premium' },
    ],
  },
  {
    id: 'R2222',
    label: 'R2222',
    children: [
      { id: 'pickers-community', label: '@mui/x-date-pickers' },
      { id: 'pickers-pro', label: '@mui/x-date-pickers-pro' },
    ],
  },
  {
    id: 'R3333',
    label: 'R3333',
    children: [{ id: 'charts-community', label: '@mui/x-charts' }],
  },
  {
    id: 'R4444',
    label: 'R4444',
    children: [{ id: 'tree-view-community', label: 'Maverick' }],
  },
];
export default function ParentChildrenSelectionRelationship() {
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [disabledLots, setDisabledLots] = useState(['R1111']);
  const [lotList, setLotList] = useState('');

  const transformArrayInStringList = (array) => {
    const stringList = array.toString();
    const lotListParsed = stringList.replace(/[ ,;]/g, '\n');
    return lotListParsed;
  };
  const getAllNodesIds = () => {
    const ids = [];
    const registerItemId = (item) => {
      if (disabledLots.includes(item.id)) return;
      ids.push(item.id);
      item.children?.forEach(registerItemId);
    };

    MUI_X_PRODUCTS.forEach(registerItemId);

    return ids.sort();
  };
  const getAllParentIds = () => {
    const ids = [];
    const registerItemId = (item) => {
      ids.push(item.id);
    };

    MUI_X_PRODUCTS.forEach(registerItemId);

    return ids.sort();
  };
  const getAllItemsWithChildrenItemIds = () => {
    const itemIds = [];
    const registerItemId = (item) => {
      if (item.children?.length) {
        itemIds.push(item.id);
        item.children.forEach(registerItemId);
      }
    };

    MUI_X_PRODUCTS.forEach(registerItemId);

    return itemIds;
  };
  const expandAllLots = () => {
    setExpandedItems((oldExpanded) =>
      oldExpanded.length === 0 ? getAllItemsWithChildrenItemIds() : []
    );
  };
  const selectAllNodes = () => {
    setSelectedItems((oldSelected) =>
      oldSelected.length === 0 ? getAllNodesIds() : []
    );
    // ! Discard lots from "disabledLots"
    const relevantLots = getAllParentIds().filter(
      (pi) => !disabledLots.includes(pi)
    );
    setLotList((oldSelected) =>
      oldSelected === '' ? transformArrayInStringList(relevantLots) : ''
    );
  };
  const expandIndividualNode = (_event, itemIds) => {
    setExpandedItems(itemIds);
  };
  const getChildrenNodes = (item) => {
    const ids = [];
    if (rutils.hasProperty({ ...item }, 'children')) {
      item.children?.forEach((child) => {
        ids.push(child.id);
        ids.push(...getChildrenNodes(child));
      });
    }
    return ids;
  };
  const unselectChildrenAddon = (itemId) => {
    const item = MUI_X_PRODUCTS.find((i) => i.id === itemId);
    const children = getChildrenNodes(item);
    return children;
  };
  const selectChildrenAddon = (itemId) => {
    const item = MUI_X_PRODUCTS.find((i) => i.id === itemId);
    const children = getChildrenNodes(item);
    return children;
  };
  const itemIsChild = (itemId) => {
    const item = MUI_X_PRODUCTS.find((i) => i.id === itemId);
    const children = getChildrenNodes(item);
    return !rutils.hasValue(children);
  };
  const getParent = (childItemId) => {
    const parent = MUI_X_PRODUCTS.find((i) => {
      if (rutils.hasProperty({ ...i }, 'children')) {
        const child = i.children.find((child) => child.id === childItemId);
        if (child) return i;
      }
    });
    return parent;
  };
  const checkChildrenUnSelection = (children) => {
    // ! Check how many children are still selected
    const childrenIds = children.map((item) => item.id);
    const idsSet = new Set(childrenIds);
    const count = selectedItems.filter((element) => idsSet.has(element)).length;
    return count === 1;
  };
  const checkChildrenSelection = (children, itemId) => {
    // ! Check how many children are still selected
    const childrenIds = children.map((item) => item.id);
    const selectedItems_ = new Set([...selectedItems, itemId]);
    const allSelected = childrenIds.every((element) =>
      selectedItems_.has(element)
    );
    return allSelected;
  };
  // ! Critical function
  const selectIndividualNode = (_event, itemId, isSelected) => {
    setSelectedItems((oldValue) => {
      let currentSelectedItems = [...oldValue];
      const parent = getParent(itemId);
      if (isSelected && itemIsChild(itemId)) {
        // ! If child is selected ,check if all parent children are selected toofull
        // ! If are children are selected, force parent to select
        // ! If there is at least 1 child unselected, keep parent unselected
        const allChildrenselected = checkChildrenSelection(
          parent.children,
          itemId
        );
        if (allChildrenselected)
          currentSelectedItems = [...currentSelectedItems, parent.id];

        currentSelectedItems = [...currentSelectedItems, itemId];
      } else if (isSelected) {
        // ! If parent is selected, propagate selection to children
        const selectedChildren = selectChildrenAddon(itemId);
        currentSelectedItems = [
          ...currentSelectedItems,
          itemId,
          ...selectedChildren,
        ];
      } else if (!isSelected && itemIsChild(itemId)) {
        // ! If child is unselected, check if all parent children are unselected too
        // ! If are children are unselected, force parent to unselect
        // ! If there is at least 1 child selected, keep parent selected
        const allChildrenUnselected = checkChildrenUnSelection(
          parent.children,
          itemId
        );
        if (allChildrenUnselected) {
          currentSelectedItems = currentSelectedItems.filter(
            (csi) => csi !== parent.id
          );
        }
        currentSelectedItems = currentSelectedItems.filter(
          (csi) => csi !== itemId
        );
      } else {
        // ! If parent is unselected, propagate unselection to children
        const selectedChildren = unselectChildrenAddon(itemId);
        currentSelectedItems = currentSelectedItems.filter(
          (csi) => csi !== itemId && !selectedChildren.includes(csi)
        );
      }
      currentSelectedItems = rutils.getUniqueValues(currentSelectedItems);
      // ! Fill the Lot List Accordingly
      const parentsStillSelected = currentSelectedItems.filter((csi) =>
        getAllParentIds().includes(csi)
      );
      // ! Discard lots from "disabledLots"
      const relevantLots = parentsStillSelected.filter(
        (pi) => !disabledLots.includes(pi)
      );
      setLotList(
        rutils.hasValue(parentsStillSelected)
          ? transformArrayInStringList(relevantLots.sort())
          : ''
      );

      return currentSelectedItems;
    });
  };

  useEffect(() => {
    selectAllNodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        minHeight: 352,
        minWidth: 290,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TextField
        id='outlined-basic'
        label='Outlined'
        variant='outlined'
        multiline
        minRows={10}
        value={lotList}
        onChange={(e) => setLotList(e.target.value)}
      />
      <div>
        <Button onClick={selectAllNodes}>
          {selectedItems.length === 0 ? 'Select all' : 'Unselect all'}
        </Button>
      </div>
      <div>
        <Button onClick={expandAllLots}>
          {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </div>
      <RichTreeView
        items={MUI_X_PRODUCTS}
        checkboxSelection
        multiSelect={true}
        selectedItems={selectedItems.filter((si) => !disabledLots.includes(si))}
        expandedItems={expandedItems}
        onExpandedItemsChange={expandIndividualNode}
        onItemSelectionToggle={selectIndividualNode}
        isItemDisabled={(item) => disabledLots.includes(item.id)}
        slots={{
          endIcon: BlurCircularIcon,
          item: (i) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
              }}
            >
              <TreeItem itemId={i.itemId} label={i.label}>
                {i.children.map((c, idx) => (
                  <TreeItem
                    key={idx}
                    itemId={c.props.itemId}
                    label={c.props.label}
                  />
                ))}
              </TreeItem>
              <IconButton>
                <ContentCopyIcon />
              </IconButton>
            </div>
          ),
        }}
      />
    </Box>
  );
}
