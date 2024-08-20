import React, { Fragment, useState } from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import AdjustIcon from '@mui/icons-material/Adjust';
import HubIcon from '@mui/icons-material/Hub';
import ExpandIcon from './ExpandIcon';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import TimelineIcon from '@mui/icons-material/Timeline';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { hasProperty } from '00ricardo-utils';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
export default function Graphtoolbar({
  expandNodes,
  condenseNodes,
  centerNodes,
  enableParticules,
  setEnableParticules,
  maxLevel,
  level,
  focusRoot,
  setLevel,
  zoomIn,
  zoomOut,
}) {
  const [collapse, setCollapse] = useState(false);

  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };
  const generalControls = [
    {
      helper: 'Center All Nodes',
      icon: <AdjustIcon />,
      callback: () => {
        condenseNodes();
        centerNodes();
      },
    },
    {
      helper: 'Expand Nodes',
      icon: <ExpandIcon />,
      callback: () => expandNodes(),
    },
    {
      helper: 'Condense Nodes',
      icon: <HubIcon />,
      callback: () => condenseNodes(),
    },
  ];
  const layerControls = [
    {
      helper: `${enableParticules ? 'Stop' : 'Resume'} Particule Animation`,
      icon: <TimelineIcon />,
      callback: () => setEnableParticules(!enableParticules),
    },
    {
      helper: 'Zoom In',
      component: (
        <FormControl
          size='small'
          margin='none'
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent !important',
            },
          }}
        >
          <Select value={level} onChange={handleChangeLevel}>
            <MenuItem value={'all'}>Show All Levels</MenuItem>
            {Array.from({ length: maxLevel }).map((_, idx) => (
              <MenuItem key={idx} value={idx + 1}>
                {`Show ${idx + 1} level${idx + 1 > 1 ? 's' : ''}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
    {
      helper: 'Zoom Out',
      icon: <ZoomOutIcon />,
      callback: () => {},
    },
  ];
  const zoomControls = [
    {
      helper: 'Focus the Root',
      icon: <MyLocationIcon />,
      callback: () => focusRoot(),
    },
    {
      helper: 'Zoom In',
      icon: <ZoomInIcon />,
      callback: () => zoomIn(),
    },
    {
      helper: 'Zoom Out',
      icon: <ZoomOutIcon />,
      callback: () => zoomOut(),
    },
  ];

  return (
    <div style={{ position: 'absolute', top: 65, left: 16, zIndex: 100 }}>
      <Paper
        elevation={0}
        sx={{
          display: 'flex',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          flexWrap: 'wrap',
          alignItems: 'center',
          paddingLeft: 1,
        }}
      >
        {!collapse && (
          <Fragment>
            <Typography variant='caption' display='block'>
              Forces
            </Typography>
            {generalControls.map((act, idx) => (
              <Tooltip key={idx} title={act.helper}>
                <IconButton onClick={() => act.callback()}>
                  {act.icon}
                </IconButton>
              </Tooltip>
            ))}
            <Divider flexItem orientation='vertical' sx={{ mx: 0.5, my: 1 }} />
            <Typography variant='caption' display='block'>
              Layers
            </Typography>
            {layerControls.map((act, idx) => (
              <Fragment key={idx}>
                {hasProperty(act, 'callback') ? (
                  <Tooltip title={act.helper}>
                    <IconButton onClick={() => act.callback()}>
                      {act.icon}
                    </IconButton>
                  </Tooltip>
                ) : hasProperty(act, 'component') ? (
                  act.component
                ) : (
                  <></>
                )}
              </Fragment>
            ))}
            <Divider flexItem orientation='vertical' sx={{ mx: 0.5, my: 1 }} />
            <Typography variant='caption' display='block'>
              Zoom
            </Typography>
            {zoomControls.map((act, idx) => (
              <Tooltip key={idx} title={act.helper}>
                <IconButton onClick={() => act.callback()}>
                  {act.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Fragment>
        )}
        {collapse && (
          <Typography variant='caption' display='block'>
            Controls
          </Typography>
        )}
        <Tooltip title={!collapse ? 'Hide Controls' : 'Show Controls'}>
          <IconButton
            onClick={() => {
              setCollapse(!collapse);
            }}
          >
            {!collapse ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          </IconButton>
        </Tooltip>
      </Paper>
    </div>
  );
}
