import React from 'react';
import Drawer from '@mui/material/Drawer';
import NoRowsOverlay from './NoRowsOverlay';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HubIcon from '@mui/icons-material/Hub';
import List from '@mui/material/List';
import { hasValue } from '00ricardo-utils';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
const drawerWidth = 320;
const RightDrawer = ({
  open,
  relations,
  setNodeSelected,
  getDirectChildrenWithLinks,
  focusNode,
  data,
  nodes,
}) => {
  return (
    <Drawer
      sx={{
        'width': drawerWidth,
        'flexShrink': 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='persistent'
      anchor='right'
      open={open}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography>{relations.node.label} Relations</Typography>
        <IconButton onClick={() => setNodeSelected({ node: {}, children: [] })}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {hasValue(relations.children) ? (
          relations.children.map((child, idx) => (
            <ListItem key={idx} disablePadding>
              <ListItemButton
                onClick={() => {
                  setNodeSelected({
                    node: child.node,
                    children: getDirectChildrenWithLinks(
                      child.node.leaf,
                      data,
                      nodes
                    ),
                  });
                  focusNode(child.node);
                }}
              >
                <ListItemIcon>
                  <HubIcon />
                </ListItemIcon>
                <ListItemText primary={child.node.label} color='#282828' />
                <ListItemText primary={child.relationType} color='#282828' />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <NoRowsOverlay />
        )}
      </List>
    </Drawer>
  );
};

export default RightDrawer;
