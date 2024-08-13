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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const mavericks_data = [
  {
    id: 1,
    lot_id: 203,
    lotlabel: 'LotX',
    evt_id: 3001,
    evtt_description: 'Gala Night',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 2,
    lot_id: 203,
    lotlabel: 'LotX',
    evt_id: 3002,
    evtt_description: 'Charity Auction',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 3,
    lot_id: 204,
    lotlabel: 'LotY',
    evt_id: 3003,
    evtt_description: 'Concert',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 4,
    lot_id: 205,
    lotlabel: 'LotZ',
    evt_id: 3004,
    evtt_description: 'Tech Conference',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 5,
    lot_id: 206,
    lotlabel: 'LotA1',
    evt_id: 3005,
    evtt_description: 'Book Fair',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 6,
    lot_id: 206,
    lotlabel: 'LotA1',
    evt_id: 3006,
    evtt_description: 'Art Exhibition',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 7,
    lot_id: 207,
    lotlabel: 'LotB2',
    evt_id: 3007,
    evtt_description: 'Food Festival',
    postponed_ny: 'N',
    delegated_ny: 'N',
  },
  {
    id: 8,
    lot_id: 208,
    lotlabel: 'LotC3',
    evt_id: 3008,
    evtt_description: 'Science Fair',
    postponed_ny: 'Y',
    delegated_ny: 'Y',
  },
  {
    id: 9,
    lot_id: 208,
    lotlabel: 'LotC3',
    evt_id: 3009,
    evtt_description: 'Startup Pitch',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 10,
    lot_id: 209,
    lotlabel: 'LotD4',
    evt_id: 3010,
    evtt_description: 'Film Screening',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 11,
    lot_id: 209,
    lotlabel: 'LotD4',
    evt_id: 3011,
    evtt_description: 'Music Festival',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 12,
    lot_id: 210,
    lotlabel: 'LotE5',
    evt_id: 3012,
    evtt_description: 'Dance Workshop',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 13,
    lot_id: 211,
    lotlabel: 'LotF6',
    evt_id: 3013,
    evtt_description: 'Theater Play',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 14,
    lot_id: 211,
    lotlabel: 'LotF6',
    evt_id: 3014,
    evtt_description: 'Sports Event',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 15,
    lot_id: 212,
    lotlabel: 'LotG7',
    evt_id: 3015,
    evtt_description: 'Gaming Convention',
    postponed_ny: 'N',
    delegated_ny: 'N',
  },
  {
    id: 16,
    lot_id: 213,
    lotlabel: 'LotH8',
    evt_id: 3016,
    evtt_description: 'Fashion Show',
    postponed_ny: 'Y',
    delegated_ny: 'Y',
  },
  {
    id: 17,
    lot_id: 214,
    lotlabel: 'LotI9',
    evt_id: 3017,
    evtt_description: 'Business Summit',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 18,
    lot_id: 215,
    lotlabel: 'LotJ10',
    evt_id: 3018,
    evtt_description: 'Community Meetup',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 19,
    lot_id: 215,
    lotlabel: 'LotJ10',
    evt_id: 3019,
    evtt_description: 'Investor Forum',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 20,
    lot_id: 216,
    lotlabel: 'LotK11',
    evt_id: 3020,
    evtt_description: 'Yoga Retreat',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 21,
    lot_id: 217,
    lotlabel: 'LotL12',
    evt_id: 3021,
    evtt_description: 'Cooking Class',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 22,
    lot_id: 217,
    lotlabel: 'LotL12',
    evt_id: 3022,
    evtt_description: 'Craft Workshop',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 23,
    lot_id: 218,
    lotlabel: 'LotM13',
    evt_id: 3023,
    evtt_description: 'Writing Seminar',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 24,
    lot_id: 218,
    lotlabel: 'LotM13',
    evt_id: 3024,
    evtt_description: 'Photography Contest',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 25,
    lot_id: 219,
    lotlabel: 'LotN14',
    evt_id: 3025,
    evtt_description: 'Pet Show',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 26,
    lot_id: 220,
    lotlabel: 'LotO15',
    evt_id: 3026,
    evtt_description: 'Volunteer Fair',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 27,
    lot_id: 220,
    lotlabel: 'LotO15',
    evt_id: 3027,
    evtt_description: 'Job Fair',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 28,
    lot_id: 221,
    lotlabel: 'LotP16',
    evt_id: 3028,
    evtt_description: 'Marathon',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 29,
    lot_id: 221,
    lotlabel: 'LotP16',
    evt_id: 3029,
    evtt_description: 'Triathlon',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 30,
    lot_id: 222,
    lotlabel: 'LotQ17',
    evt_id: 3030,
    evtt_description: 'Cycling Race',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 31,
    lot_id: 223,
    lotlabel: 'LotR18',
    evt_id: 3031,
    evtt_description: 'Basketball Tournament',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 32,
    lot_id: 223,
    lotlabel: 'LotR18',
    evt_id: 3032,
    evtt_description: 'Football Match',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 33,
    lot_id: 224,
    lotlabel: 'LotS19',
    evt_id: 3033,
    evtt_description: 'Baseball Game',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 34,
    lot_id: 224,
    lotlabel: 'LotS19',
    evt_id: 3034,
    evtt_description: 'Cricket Match',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 35,
    lot_id: 225,
    lotlabel: 'LotT20',
    evt_id: 3035,
    evtt_description: 'Tennis Open',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 36,
    lot_id: 226,
    lotlabel: 'LotU21',
    evt_id: 3036,
    evtt_description: 'Golf Tournament',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 37,
    lot_id: 226,
    lotlabel: 'LotU21',
    evt_id: 3037,
    evtt_description: 'Swimming Championship',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 38,
    lot_id: 227,
    lotlabel: 'LotV22',
    evt_id: 3038,
    evtt_description: 'Track Meet',
    postponed_ny: 'Y',
    delegated_ny: 'N',
  },
  {
    id: 39,
    lot_id: 228,
    lotlabel: 'LotW23',
    evt_id: 3039,
    evtt_description: 'Chess Tournament',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
  {
    id: 40,
    lot_id: 228,
    lotlabel: 'LotW23',
    evt_id: 3040,
    evtt_description: 'Esports Competition',
    postponed_ny: 'N',
    delegated_ny: 'Y',
  },
];
export default function ParentChildrenSelectionRelationship() {
  const [expandedItems, setExpandedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [disabledLots, setDisabledLots] = useState(['3001', 'LotB2', '3007']);
  const [lotList, setLotList] = useState('');
  const [mavericks, setMavericks] = useState([]);
  const [operation, setOperation] = useState('SOLVE');

  const handleChange = (event) => {
    setOperation(event.target.value);
  };

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

    mavericks.forEach(registerItemId);

    return ids.sort();
  };
  const getAllParentIds = () => {
    const ids = [];
    const registerItemId = (item) => {
      ids.push(item.id);
    };

    mavericks.forEach(registerItemId);

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

    mavericks.forEach(registerItemId);

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
    const item = mavericks.find((i) => i.id === itemId);
    const children = getChildrenNodes(item);
    return children;
  };
  const selectChildrenAddon = (itemId) => {
    const item = mavericks.find((i) => i.id === itemId);
    const children = getChildrenNodes(item);
    return children;
  };
  const itemIsChild = (itemId) => {
    const item = mavericks.find((i) => i.id === itemId);
    const children = getChildrenNodes(item);
    return !rutils.hasValue(children);
  };
  const getParent = (childItemId) => {
    const parent = mavericks.find((i) => {
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
  const parseIntoTreeViewDataModel = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const {
        lot_id,
        lotlabel,
        evt_id,
        evtt_description,
        postponed_ny,
        delegated_ny,
      } = item;

      // Initialize the group if it doesn't exist
      if (!groupedData[lotlabel]) {
        groupedData[lotlabel] = {
          id: lotlabel,
          label: lotlabel,
          children: [],
        };
      }

      // Push the event data into the children array
      groupedData[lotlabel].children.push({
        id: evt_id.toString(),
        evt_id,
        label: evtt_description,
        postponed_ny,
        delegated_ny,
      });
    });

    // Convert the grouped data object into an array
    return Object.values(groupedData);
  };

  useEffect(() => {
    const mavs = parseIntoTreeViewDataModel(mavericks_data);
    setMavericks([...mavs]);
  }, [mavericks_data]);

  useEffect(() => {
    if (rutils.hasValue(mavericks)) selectAllNodes();
  }, [mavericks]);

  useEffect(() => {
    console.log(operation);
  }, [operation]);

  return (
    <Box
      sx={{
        minHeight: 352,
        minWidth: 290,
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
      }}
    >
      <FormControl fullWidth>
        <InputLabel>Maverick Action</InputLabel>
        <Select value={operation} onChange={handleChange}>
          <MenuItem value={'SOLVE'}>Solve</MenuItem>
          <MenuItem value={'DELEGATE'}>Delegate</MenuItem>
        </Select>
      </FormControl>
      <TextField
        id='outlined-basic'
        label='Outlined'
        variant='outlined'
        multiline
        minRows={5}
        maxRows={5}
        value={lotList}
        onChange={(e) => setLotList(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
        <Button onClick={selectAllNodes}>
          {selectedItems.length === 0 ? 'Select all' : 'Unselect all'}
        </Button>
        <Button onClick={expandAllLots}>
          {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </div>
      <RichTreeView
        sx={{
          '& .MuiTreeItem-content.Mui-selected': {
            backgroundColor: 'transparent',
          },
        }}
        items={mavericks}
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
                backgroundColor: disabledLots.includes(i.itemId)
                  ? '#ffe9b1'
                  : 'transparent',
              }}
            >
              <TreeItem itemId={i.itemId} label={i.label}>
                {i.children.map((c, idx) => (
                  <TreeItem
                    sx={{
                      backgroundColor: disabledLots.includes(c.props.itemId)
                        ? '#ffe9b1'
                        : 'transparent',
                    }}
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
