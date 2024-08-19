import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HubIcon from '@mui/icons-material/Hub';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { hasValue } from '00ricardo-utils';
import NoRowsOverlay from './NoRowsOverlay';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import HelperDialog from './HelperDialog';
const drawerWidth = 320;

export default function PermanentDrawerRight({
  relations,
  setNodeSelected,
  getDirectChildrenWithLinks,
  data,
  nodes,
}) {
  const [openHelperDialog, setOpenHelperDialog] = useState(false);
  return (
    <Box sx={{ display: 'flex' }}>
      <HelperDialog
        openHelperDialog={openHelperDialog}
        setOpenHelperDialog={setOpenHelperDialog}
      />
      <CssBaseline />
      <AppBar
        position='fixed'
        sx={{
          width: hasValue(relations.children)
            ? `calc(100% - ${drawerWidth}px)`
            : '100%',
          mr: hasValue(relations.children) ? `${drawerWidth}px` : '0px',
          backgroundColor: '#282828',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant='h6' noWrap component='div'>
            Lot Relations
          </Typography>
          <Tooltip title='Help'>
            <IconButton onClick={() => setOpenHelperDialog(true)}>
              <HelpIcon sx={{ color: '#fff' }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {hasValue(relations.node) && (
        <Drawer
          sx={{
            'width': drawerWidth,
            'flexShrink': 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='permanent'
          anchor='right'
        >
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography>{relations.node.label} Relations</Typography>
            <IconButton
              onClick={() => setNodeSelected({ node: {}, children: [] })}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
            {hasValue(relations.children) ? (
              relations.children.map((child, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemButton
                    onClick={() =>
                      setNodeSelected({
                        node: child.node,
                        children: getDirectChildrenWithLinks(
                          child.node.leaf,
                          data,
                          nodes
                        ),
                      })
                    }
                  >
                    <ListItemIcon>
                      <HubIcon />
                    </ListItemIcon>
                    <ListItemText primary={child.node.label} color='#282828' />
                    <ListItemText
                      primary={child.relationType}
                      color='#282828'
                    />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <NoRowsOverlay />
            )}
          </List>
        </Drawer>
      )}
    </Box>
  );
}
