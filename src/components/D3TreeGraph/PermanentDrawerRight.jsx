import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { hasValue } from '00ricardo-utils';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import HelperDialog from './HelperDialog';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import RightDrawer from './RightDrawer';
const drawerWidth = 320;
const Search = styled('div')(({ theme }) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  'marginLeft': 0,
  'width': '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  'color': 'inherit',
  'width': '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      'width': '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
export default function PermanentDrawerRight({
  relations,
  setNodeSelected,
  getDirectChildrenWithLinks,
  data,
  nodes,
  setSearchLot,
  focusNode,
  deepSearch,
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
          <div style={{ display: 'flex' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Search Lot'
                onChange={(e) => setSearchLot(e.target.value.trim())}
                onKeyDown={(e) => (e.key === 'Enter' ? deepSearch() : () => {})}
              />
            </Search>
            <Tooltip title='Help'>
              <IconButton onClick={() => setOpenHelperDialog(true)}>
                <HelpIcon sx={{ color: '#fff' }} />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      <RightDrawer
        open={hasValue(relations.node)}
        relations={relations}
        setNodeSelected={setNodeSelected}
        getDirectChildrenWithLinks={getDirectChildrenWithLinks}
        focusNode={focusNode}
        data={data}
        nodes={nodes}
      />
    </Box>
  );
}
